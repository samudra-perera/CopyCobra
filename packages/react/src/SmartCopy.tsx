import React, { useEffect, useRef, useState } from "react";
import {
  Variant,
  chooseVariant,
  callModelProvider,
  registerVariant,
} from "@copycobra/core";
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
  console.log("🟢 SmartCopy mounted");

  const [text, setText] = useState(fallback);
  const { provider: defaultProvider, apiKeys, mode } = useCopyCobraConfig();
  const finalProvider = provider || defaultProvider;
  const hasRegistered = useRef(false);
  const isDev = mode === "dev";

  useEffect(() => {
    if (!hasRegistered.current) {
      console.log("SmartCopy registering variants for:", cacheKey);
      for (const variant of variants) {
        registerVariant("default", cacheKey, variant);
      }
      hasRegistered.current = true;
    }

    if (isDev) {
      console.log("Skipping AI call in dev mode:", cacheKey);
      setText(fallback);
      return;
    }

    const variant =
      variants.find((v) => v.label === selectedVariant) ||
      chooseVariant(variants, cacheKey);

    const fetchAIText = async () => {
      try {
        const response = await callModelProvider(
          finalProvider,
          variant,
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
