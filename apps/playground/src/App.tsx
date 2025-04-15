import { SmartCopy, CopyCobraProvider } from "@copycobra/react";
import { getPromptGroup } from "@copycobra/core";
import { useEffect, useState } from "react";

function App() {
  const [promptGroup, setPromptGroups] = useState({});

  //Grab the current regirsted prompt groups at runtime
  useEffect(() => {
    const groups = getPromptGroup();
    setPromptGroups(groups);
  }, []);

  return (
    <CopyCobraProvider
      config={{
        provider: "gemini",
        apiKeys: {
          gemini: import.meta.env.VITE_GEMINI_API_KEY,
          openai: import.meta.env.VITE_OPENAI_API_KEY,
        },
        mode: import.meta.env.MODE === "development" ? "dev" : "prod",
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
        {/* ✅ Debug output */}
        <h2 style={{ marginTop: "3rem" }}>🧠 Registered Prompt Group</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem" }}>
          {JSON.stringify(promptGroup, null, 2)}
        </pre>
      </div>
    </CopyCobraProvider>
  );
}

export default App;
