export function parseJSONResponse(
  raw: string,
): { text: string; tone?: string } | null {
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("[CopyCobra Parse Error]", err);
    return null;
  }
}
