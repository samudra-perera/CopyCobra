interface ImportMetaEnv {
  VITE_COPYCOBRA_MODE?: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    VITE_COPYCOBRA_MODE?: string;
  }
}
