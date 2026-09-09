export function isWhatsAppConfigured() {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
    process.env.WHATSAPP_PHONE_NUMBER_ID
  );
}

export async function sendWhatsAppMessage(to, message) {
  if (!isWhatsAppConfigured()) {
    throw new Error("WhatsApp API is not configured.");
  }

  // Real API request will be added after Meta credentials are configured.
  return {
    success: true,
    status: "ready",
    to,
    message
  };
}