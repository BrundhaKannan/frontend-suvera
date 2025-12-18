// src/api.js
import axios from "axios";

/* ================================
   BACKEND API (AWS / .NET)
   ================================ */
const BACKEND_API_BASE_URL =
  "http://suvera-backend-env.eba-kjxjae4y.ap-southeast-2.elasticbeanstalk.com/api";

const backendApi = axios.create({
  baseURL: BACKEND_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token for backend requests
backendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("hospitalToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   NLP API (Render)
   ================================ */
const NLP_API_URL = "https://ups-nlp.onrender.com";

export async function analyzeSymptoms(text) {
  try {
    const response = await fetch(`${NLP_API_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    return await response.json();
  } catch (error) {
    console.error("NLP API error:", error);
    return { error: "Unable to connect to NLP service" };
  }
}

/* ================================
   EXPORT BACKEND API
   ================================ */
export default backendApi;
