import { sendWhatsAppMessage, isWhatsAppConfigured } from "../services/whatsapp.js";

export async function whatsappAgent(request) {
  if (!isWhatsAppConfigured()) {
    return {
      success: false,
      agent: "whatsappAgent",
      status: "not_configured",
      message: "WhatsApp API is not configured."
    };
  }

  try {
    const result = await sendWhatsAppMessage(
      request.to,
      request.message
    );

    return {
      success: true,
      agent: "whatsappAgent",
      status: "sent",
      result
    };
  } catch (error) {
    return {
      success: false,
      agent: "whatsappAgent",
      status: "error",
      message: error.message
    };
  }
}
