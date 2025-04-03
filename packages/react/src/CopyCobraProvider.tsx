import React, { createContext, useContext } from "react";

type ProviderType = "gemini" | "openai";

interface CopyCobraConfig {
  provider: ProviderType;
  apiKeys: {
    gemini?: string;
    openai?: string;
  };
}

const CopyCobraContext = createContext<CopyCobraConfig | null>(null);

export const CopyCobraProvider: React.FC<{
  config: CopyCobraConfig;
  children: React.ReactNode;
}> = ({ config, children }) => (
  <CopyCobraContext.Provider value={config}>
    {children}
  </CopyCobraContext.Provider>
);

export const useCopyCobraConfig = () => {
  const ctx = useContext(CopyCobraContext);
  if (!ctx) throw new Error("Missing <CopyCobraProvider>");
  return ctx;
};
