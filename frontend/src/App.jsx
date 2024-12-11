import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState(""); // To store user input
  const [result, setResult] = useState(""); // To display AI response
  const [loading, setLoading] = useState(false); // For loading state

  const handleGenerate = async () => {
    if (!prompt) return alert("Please enter a prompt!");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/generate", {
        prompt,
      });
      setResult(response.data.text);
      setPrompt("");
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating content.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Gemini Chatbot</h1>
      <textarea
        placeholder="Enter your prompt here..."
        rows="5"
        cols="50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>Generated Content:</h3>
        <p>{result || "Your generated content will appear here."}</p>
      </div>
    </div>
  );
}

export default App;
