import { askClaude, isAnthropicConfigured } from "../services/anthropic.js";

export async function claudeAgent(request) {
  if (!isAnthropicConfigured()) {
    return {
      success: false,
      agent: "claudeAgent",
      status: "not_configured",
      message:
        "Claude API is not configured. Add ANTHROPIC_API_KEY when API access is available.",
      request
    };
  }

  try {
    const answer = await askClaude(request.task);

    return {
      success: true,
      agent: "claudeAgent",
      status: "completed",
      answer
    };
  } catch (error) {
    return {
      success: false,
      agent: "claudeAgent",
      status: "error",
      message: error.message
    };
  }
}