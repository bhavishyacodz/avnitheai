import { understandCommand } from "./masterAI.js";

import { claudeAgent } from "./agents/claudeAgent.js";
import { githubAgent } from "./agents/githubAgent.js";
import { whatsappAgent } from "./agents/whatsappAgent.js";

export async function routeCommand(command) {
  const analysis = understandCommand(command);

  if (!analysis.success) {
    return analysis;
  }

  switch (analysis.intent) {
    case "ask_ai":
      return await claudeAgent(analysis);

    case "github_action":
      return await githubAgent(analysis);

    case "whatsapp_action":
  return await whatsappAgent({
    ...analysis,
    to: analysis.to,
    message: analysis.message
  });
    default:
      return {
        success: true,
        routed: false,
        agent: null,
        analysis,
        message: "No agent is available for this command yet."
      };
  }
}
