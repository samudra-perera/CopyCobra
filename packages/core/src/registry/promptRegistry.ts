import { Variant } from "../types/variant";
import { PromptGroup } from "../types/prompt-group";

type RegisteredVariant = {
  cacheKey: string;
  groupId: string;
  variant: Variant;
};

const registry = new Set<RegisteredVariant>();

export function registerVariant(
  groupId: string,
  cacheKey: string,
  variant: Variant,
) {
  registry.add({ groupId, cacheKey, variant });
}

export function getPromptGroup(): Record<string, PromptGroup> {
  const promptGroups: Record<string, PromptGroup> = {};
  registry.forEach(({ groupId, cacheKey, variant }) => {
    if (!promptGroups[groupId]) {
      promptGroups[groupId] = { id: groupId, variants: [] };
    }
    promptGroups[groupId].variants.push({ cacheKey, variant });
  });
  return promptGroups;
}
