import React, { useEffect, useState } from "react";
import { chooseVariant, Variant } from "@copycobra/core";

interface SmartCopyProps {
  apiKey: string;
  fallback: string;
  variants: Variant[];
  cacheKey: string;
  model?: string;
}

export const SmartCopy = (props: SmartCopyProps) => {
  const { apiKey, fallback, variants, cacheKey, model } = props;

  const [text, setText] = useState(fallback);

  useEffect(() => {
    const variant = chooseVariant(variants, cacheKey);

    const fetchAIText = async () => {
      try {
        const variant = chooseVariant(variants, cacheKey);

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: variant.prompt }],
                },
              ],
            }),
          },
        );

        const data = await res.json();
        const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (raw) {
          let parsed: { text: string; tone: string };

          try {
            const cleaned = raw
              .replace(/```json/g, "")
              .replace(/```/g, "")
              .trim();

            parsed = JSON.parse(cleaned);
            setText(parsed.text);
          } catch (e) {
            console.warn("Gemini returned non-JSON:", raw);
            setText(fallback);
          }
        } else {
          setText(fallback);
        }
      } catch (err) {
        console.warn("[CopyCobra Gemini Error]", err);
        setText(fallback);
      }
    };

    fetchAIText();
  }, [apiKey, variants, cacheKey, model]);

  return <span>{text}</span>;
};
