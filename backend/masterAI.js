export function understandCommand(command) {
  const text = command.trim();

  if (!text) {
    return {
      success: false,
      error: "Command cannot be empty."
    };
  }

  const lower = text.toLowerCase();

  // WhatsApp command
  if (lower.includes("whatsapp")) {
    const phoneMatch = text.match(/(?:\+?\d[\d\s-]{9,}\d)/);

    if (!phoneMatch) {
      return {
        success: false,
        error: "WhatsApp phone number not found."
      };
    }

    const phone = phoneMatch[0].replace(/[^\d+]/g, "");

    const messageMatch = text.match(
      /message\s+(?:"([^"]+)"|'([^']+)'|(.+?))\s+(?:to|for)\s+\+?\d/i
    );

    if (!messageMatch) {
      return {
        success: false,
        error: 'Message not found. Use: Send WhatsApp message "Hello" to +91XXXXXXXXXX'
      };
    }

    const message =
      messageMatch[1] ||
      messageMatch[2] ||
      messageMatch[3];

    return {
      success: true,
      intent: "whatsapp_action",
      action: "send_message",
      to: phone,
      message: message.trim(),
      task: text
    };
  }

  // Claude / AI command
  if (
    lower.includes("ask claude") ||
    lower.includes("ask ai") ||
    lower.includes("use claude")
  ) {
    return {
      success: true,
      intent: "ask_ai",
      target: lower.includes("claude") ? "claude" : "ai",
      task: text
    };
  }

  // GitHub command
  if (
    lower.includes("github") ||
    lower.includes("repository") ||
    lower.includes("repo")
  ) {
    return {
      success: true,
      intent: "github_action",
      action: "unknown",
      task: text
    };
  }

  return {
    success: true,
    intent: "unknown",
    target: null,
    task: text
  };
}
