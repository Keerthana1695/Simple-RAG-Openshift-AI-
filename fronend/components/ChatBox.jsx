import React, { useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://backend:5000/query", { query });
      setResults(res.data.results);
    } catch (error) {
      setResults(["Error fetching response"]);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">📄 Simple RAG Chat</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Ask a question..."
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      <div className="mt-4">
        {results.map((r, i) => (
          <p key={i} className="mb-2 p-2 bg-gray-100 rounded">
            <strong>Answer {i + 1}:</strong> {r}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
