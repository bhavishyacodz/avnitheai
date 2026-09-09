import { understandCommand } from "./masterAI.js";

export function routeCommand(command) {
  const analysis = understandCommand(command);

  if (!analysis.success) {
    return analysis;
  }

  switch (analysis.intent) {
    case "ask_ai":
      return {
        success: true,
        routed: true,
        agent: "claudeAgent",
        analysis
      };

    case "github_action":
      return {
        success: true,
        routed: true,
        agent: "githubAgent",
        analysis
      };

    case "whatsapp_action":
      return {
        success: true,
        routed: true,
        agent: "whatsappAgent",
        analysis
      };

    default:
      return {
        success: true,
        routed: false,
        agent: null,
        analysis
      };
  }
}