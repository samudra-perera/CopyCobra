import { Variant } from "../types/variant";

export function chooseVariant(variants: Variant[], cacheKey: string): Variant {
  const stored = localStorage.getItem(`copycobra-${cacheKey}`);
  if (stored) {
    return variants.find((v) => v.label === stored) || variants[0];
  }

  const totalWeight = variants.reduce((sum, v) => sum + (v.weight ?? 1), 0);
  let rand = Math.random() * totalWeight;

  for (const v of variants) {
    rand -= v.weight ?? 1;
    if (rand <= 0) {
      localStorage.setItem(`copycobra-${cacheKey}`, v.label);
      return v;
    }
  }

  return variants[0];
}
