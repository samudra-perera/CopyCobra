import type { Variant } from "../types/variant";

export function buildPrompt(variant: Variant): string {
  return `
You are a helpful copywriting assistant.

Write one high-converting call to action in the "${variant.tone || variant.label}" tone.
Goal: ${variant.goal || "Encourage users to take action"}

Respond only in this exact JSON format:
{ "text": string, "tone": string }
  `.trim();
}
