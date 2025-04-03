import React, { useEffect, useState } from "react";
import { Variant, chooseVariant, callModelProvider } from "@copycobra/core";
import { useCopyCobraConfig } from "./CopyCobraProvider";

interface SmartCopyProps {
  provider?: "gemini" | "openai";
  fallback: string;
  variants: Variant[];
  cacheKey: string;
  selectedVariant?: string;
}

export const SmartCopy = ({
  fallback,
  variants,
  cacheKey,
  selectedVariant,
  provider,
}: SmartCopyProps) => {
  const [text, setText] = useState(fallback);
  const { provider: defaultProvider, apiKeys } = useCopyCobraConfig();
  const finalProvider = provider || defaultProvider;

  useEffect(() => {
    const variant =
      variants.find((v) => v.label === selectedVariant) ||
      chooseVariant(variants, cacheKey);

    const fetchAIText = async () => {
      try {
        const response = await callModelProvider(
          finalProvider,
          variant.prompt,
          apiKeys[finalProvider]!,
        );

        if (response?.text) {
          setText(response.text);
        } else {
          setText(fallback);
        }
      } catch (err) {
        console.warn("[CopyCobra Error]", err);
        setText(fallback);
      }
    };

    fetchAIText();
  }, [finalProvider, apiKeys, selectedVariant, variants, cacheKey]);

  return <span>{text}</span>;
};
