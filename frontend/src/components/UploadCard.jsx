// src/components/UploadCard.jsx
import React, { useState } from "react";

export default function UploadCard({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Code File</h2>

      <input
        type="file"
        accept=".js,.ts,.jsx,.tsx,.py,.java,.c,.cpp,.go,.json,.rb,.php,.rs,.cs,.txt"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setFilename(e.target.files[0]?.name || "");
        }}
        className="mb-4"
      />

      <div className="flex gap-3">
        <button
          disabled={!file}
          onClick={() => onSubmit({ type: "file", file })}
          className="bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg shadow"
        >
          Upload & Review
        </button>

        <button
          onClick={() => {
            setFile(null);
            setFilename("");
          }}
          className="bg-gray-100 px-4 py-2 rounded-lg"
        >
          Clear
        </button>
      </div>

      {filename && <p className="text-sm text-gray-500 mt-3">Selected: {filename}</p>}
    </div>
  );
}
