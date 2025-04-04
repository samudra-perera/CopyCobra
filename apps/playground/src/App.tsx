import { SmartCopy, CopyCobraProvider } from "@copycobra/react";

function App() {
  return (
    <CopyCobraProvider
      config={{
        provider: "gemini",
        apiKeys: {
          gemini: import.meta.env.VITE_GEMINI_API_KEY,
          openai: import.meta.env.VITE_OPENAI_API_KEY,
        },
      }}
    >
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>CopyCobra Playground</h1>

        <SmartCopy
          cacheKey="cta-hero"
          fallback="Start your free trial"
          selectedVariant="Confident"
          variants={[
            {
              label: "Confident",
              tone: "Confident",
              goal: "Encourage users to start a free trial",
            },
            {
              label: "Friendly",
              tone: "Friendly",
              goal: "Make trying the product feel casual and fun",
            },
            {
              label: "Urgent",
              tone: "Urgent",
              goal: "Drive immediate signup for a limited-time offer",
            },
          ]}
        />
      </div>
    </CopyCobraProvider>
  );
}

export default App;
