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
          {
            label: "Default",
            prompt: `Write one clear and strong CTA for a free trial. Respond with JSON only:
{ "text": "Start your free trial today!", "tone": "Confident and direct" }`,
          },
          {
            label: "Urgent",
            prompt: `Write one urgent CTA encouraging users to start a free trial. Respond in JSON:
{ "text": "Act now — free trial ends soon!", "tone": "Urgent and motivating" }`,
          },
          {
            label: "Friendly",
            prompt: `Write one friendly and casual CTA for starting a free trial. Output only:
{ "text": "Give it a shot – it’s free!", "tone": "Casual and inviting" }`,
          },
        ]}
      />
    </div>
  );
}

export default App;
