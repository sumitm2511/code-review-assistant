// src/components/InlineTextForm.jsx
import React, { useState } from "react";

export default function InlineTextForm({ onSubmit }) {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("pasted_code.js");

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto mt-6">
      <h3 className="text-lg font-semibold mb-3">Paste Code</h3>

      <input
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        className="border p-2 rounded mb-3 w-full"
        placeholder="filename (optional)"
      />

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        className="w-full border p-3 rounded mb-3 font-mono text-sm"
        placeholder="Paste code here..."
      />

      <div className="flex gap-3">
        <button
          disabled={!code.trim()}
          onClick={() => onSubmit({ type: "text", code, filename })}
          className="bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
        >
          Submit Code
        </button>
        <button onClick={() => setCode("")} className="bg-gray-100 px-4 py-2 rounded-lg">
          Clear
        </button>
      </div>
    </div>
  );
}
