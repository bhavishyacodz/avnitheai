export function understandCommand(command) {
  const text = command.trim();

  if (!text) {
    return {
      success: false,
      error: "Command cannot be empty."
    };
  }

  const lower = text.toLowerCase();

  // Ask an AI something
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

  // GitHub-related command
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

  // WhatsApp-related command
  if (
    lower.includes("whatsapp") ||
    lower.includes("message") ||
    lower.includes("send a message")
  ) {
    return {
      success: true,
      intent: "whatsapp_action",
      action: "unknown",
      task: text
    };
  }

  // General command
  return {
    success: true,
    intent: "unknown",
    target: null,
    task: text
  };
}