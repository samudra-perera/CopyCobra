import { buildPrompt } from "../utils/promptBuilder";
import type { Variant } from "../types/variant";
import { callGemini, callOpenAI } from "./providers";

export async function callModelProvider(
  provider: "gemini" | "openai",
  variant: Variant,
  apiKey: string,
): Promise<{ text: string; tone?: string } | null> {
  const prompt = buildPrompt(variant);

  switch (provider) {
    case "gemini":
      return callGemini(prompt, apiKey);
    case "openai":
      return callOpenAI(prompt, apiKey);
    default:
      console.warn(`[CopyCobra] Unknown provider: ${provider}`);
      return null;
  }
}
