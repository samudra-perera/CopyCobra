import { SmartCopy } from "@copycobra/react";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>CopyCobra Playground</h1>
      <SmartCopy
        apiKey={import.meta.env.VITE_GEMINI_API_KEY}
        fallback="Start your free trial"
        cacheKey="cta-v1"
        variants={[
          { label: "Default", prompt: "Write a strong CTA for a free trial" },
          {
            label: "Urgent",
            prompt: "Write an urgent CTA to try a free trial",
          },
          {
            label: "Friendly",
            prompt: "Write a friendly CTA to start a free trial",
          },
        ]}
      />
    </div>
  );
}

export default App;
