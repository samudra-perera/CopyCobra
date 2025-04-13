import { Variant } from "./variant";

export interface PromptGroup {
  id: string;
  variants: Array<{
    cacheKey: string;
    variant: Variant;
  }>;
}
