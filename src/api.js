// ================================
// NLP API (Render)
// ================================
const NLP_API_URL = "https://ups-nlp.onrender.com";

// TEXT SYMPTOM ANALYSIS
export async function analyzeSymptoms(text) {
  try {
    const response = await fetch(`${NLP_API_URL}/analyze-text/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text   // 👈 this key matches FastAPI schema
      }),
    });

    if (!response.ok) {
      throw new Error("NLP request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("NLP API error:", error);
    return { error: "Error connecting to AI Backend" };
  }
}
