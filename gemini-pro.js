import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body; // Receive prompt from frontend
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text }); // Send generated text back to frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
