import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;

export function isAnthropicConfigured() {
  return Boolean(apiKey);
}

export async function askClaude(prompt) {
  if (!apiKey) {
    throw new Error("Anthropic API key is not configured.");
  }

  const anthropic = new Anthropic({
    apiKey
  });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}