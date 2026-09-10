import "dotenv/config";

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export function isWhatsAppConfigured() {
  return Boolean(
    ACCESS_TOKEN &&
    PHONE_NUMBER_ID
  );
}

export async function sendWhatsAppMessage(to, message) {
  if (!isWhatsAppConfigured()) {
    throw new Error("WhatsApp API is not configured.");
  }

  const url =
    `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        body: message
      }
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "WhatsApp API request failed."
    );
  }

  return data;
}
