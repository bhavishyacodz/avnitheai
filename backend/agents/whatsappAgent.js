export async function whatsappAgent(request) {
  return {
    success: true,
    agent: "whatsappAgent",
    status: "stub",
    message: "WhatsApp agent received the request. WhatsApp Cloud API will be connected later.",
    request
  };
}