// === frontend/src/App.jsx ===
import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("http://backend:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setAnswer(data.answer || "No answer returned.");
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>🔎 RAG with HuggingFace Inference (OpenShift AI Demo)</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={query}
          placeholder="Ask something about the document..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", padding: 8, fontSize: 16 }}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading || !query} style={{ marginTop: 10, padding: "8px 16px" }}>
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {answer && (
        <div style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: 12, borderRadius: 4 }}>
          <strong>Answer:</strong> <br />
          {answer}
        </div>
      )}
    </div>
  );
}

export default App;

