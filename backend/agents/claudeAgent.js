export async function claudeAgent(request) {
  return {
    success: true,
    agent: "claudeAgent",
    status: "stub",
    message: "Claude agent received the request. Anthropic API will be connected in Phase 3.",
    request
  };
}