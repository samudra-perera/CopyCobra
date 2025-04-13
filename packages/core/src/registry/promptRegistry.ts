import { Variant } from "../types/variant";
import { PromptGroup } from "../types/prompt-group";

const promptGroups: Record<string, PromptGroup> = {};
const registeredKeys = new Set<string>();

export function registerVariant(
  groupId: string,
  cacheKey: string,
  variant: Variant,
) {
  const hashKey = `${groupId}::${cacheKey}::${variant.label}::${variant.goal ?? ""}::${variant.tone ?? ""}`;

  if (registeredKeys.has(hashKey)) return;

  console.log("✅ REGISTERING:", hashKey);

  registeredKeys.add(hashKey);

  if (!promptGroups[groupId]) {
    promptGroups[groupId] = { id: groupId, variants: [] };
  }

  promptGroups[groupId].variants.push({ cacheKey, variant });
}

export function getPromptGroup(): Record<string, PromptGroup> {
  return promptGroups;
}
