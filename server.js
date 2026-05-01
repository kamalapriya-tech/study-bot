import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b"; // ✅ FIXED MODEL

app.post("/ask", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message." });
  }

  try {
    if (!GROQ_API_KEY) {
      throw new Error("Missing Groq API key. Please set GROQ_API_KEY in .env.");
    }

    const systemPrompt = "You are StudyBot, a helpful AI tutor for students. Provide clear, concise, and educational responses. Keep answers focused and suitable for learning.";

    const endpoint = "https://api.groq.com/openai/v1/chat/completions";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 0.95
      })
    });

    const data = await response.json();

    console.log("🧠 Groq API status:", response.status);
    console.log("🧠 Groq API response:", JSON.stringify(data, null, 2));

    let reply = null;

    if (!response.ok) {
      const errorMsg = data?.error?.message || JSON.stringify(data);
      console.error("❌ Groq API Error:", errorMsg);
      throw new Error(errorMsg);
    } 
    
    // ✅ FIXED RESPONSE EXTRACTION (important)
    else if (data?.choices?.length > 0) {
      const aiMessage = data.choices[0]?.message?.content;
      if (aiMessage && aiMessage.trim()) {
        reply = aiMessage.trim();
      }
    }

    // fallback (unchanged)
    if (!reply) {
      const msgLower = message.toLowerCase();
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        reply = "Hello! I'm StudyBot, your AI study assistant. How can I help you with your studies today?";
      } else if (msgLower.includes("math") || msgLower.includes("mathematics")) {
        reply = "Mathematics is a fascinating subject! What specific math topic are you studying?";
      } else if (msgLower.includes("science")) {
        reply = "Science covers many areas! Are you asking about physics, chemistry, biology, or earth science?";
      } else if (msgLower.includes("history")) {
        reply = "History helps us understand the past. Which period or event interests you most?";
      } else if (msgLower.includes("english") || msgLower.includes("literature")) {
        reply = "English and literature are great for communication skills. What are you working on?";
      } else {
        reply = `I understand you're asking about "${message}". What subject are you studying?`;
      }
    }

    res.json({ reply });

  } catch (err) {
    console.error("❌ API Error:", err.message);

    let reply = "Sorry, I'm having trouble connecting to the AI service right now.";
    res.json({ reply });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🟢 StudyBot backend running at http://localhost:${PORT}`);
});