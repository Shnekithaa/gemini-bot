import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
}
