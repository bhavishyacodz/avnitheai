import {
  sendWhatsAppMessage,
  isWhatsAppConfigured
} from "../services/whatsapp.js";

export async function whatsappAgent(request) {
  if (!isWhatsAppConfigured()) {
    return {
      success: false,
      agent: "whatsappAgent",
      status: "not_configured",
      message: "WhatsApp API is not configured."
    };
  }

  if (!request.to) {
    return {
      success: false,
      agent: "whatsappAgent",
      status: "invalid_request",
      message: "WhatsApp recipient number is missing."
    };
  }

  if (!request.message) {
    return {
      success: false,
      agent: "whatsappAgent",
      status: "invalid_request",
      message: "WhatsApp message is missing."
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
