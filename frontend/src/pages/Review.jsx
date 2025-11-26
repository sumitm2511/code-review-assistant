// src/pages/Review.jsx
import { useState, useRef } from "react";
import FileDrop from "../components/ui/FileDrop";
import { api } from "../api/client";
import ReportView from "../components/ui/ReportView";
import toast from "react-hot-toast";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useTheme } from "../store/useTheme";
import EditorPanel from "../components/ui/EditorPanel";

export default function Review() {
  const { theme } = useTheme();

  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedCode, setPastedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const resultRef = useRef(null);

  // Trigger file upload selection
  function onFileSelected(file) {
    setSelectedFile(file);
    setReport(null);
  }

  // Main review handler
  async function handleReview() {
    if (!selectedFile && !pastedCode.trim()) {
      toast.error("Please drag a file or paste code.");
      return;
    }

    try {
      setLoading(true);
      setReport(null);

      // If file is selected → send to file endpoint
      if (selectedFile) {
        const form = new FormData();
        form.append("file", selectedFile);

        const resp = await api.post("/review/file", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (resp.data?.ok) {
          setReport({
            filename: selectedFile.name,
            created_at: new Date().toISOString(),
            review: resp.data.review,
          });
          toast.success("Review complete!");
        } else toast.error(resp.data?.error || "Review failed.");

        setSelectedFile(null);
        setPastedCode("");

      } else {
        // Else → review pasted text
        const resp = await api.post("/review/text", {
          code: pastedCode,
          filename: "pasted_code",
        });

        if (resp.data?.ok) {
          setReport({
            filename: "pasted_code",
            created_at: new Date().toISOString(),
            review: resp.data.review,
          });
          toast.success("Review complete!");
        } else toast.error(resp.data?.error || "Review failed.");

        setPastedCode("");
      }

      // Auto scroll
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);

    } catch (err) {
      toast.error(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  // Clear all inputs
  function handleClear() {
    setSelectedFile(null);
    setPastedCode("");
    setReport(null);
    toast("Cleared.");
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* LEFT PANEL */}
      <div>
        {/* File Upload */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-1">Upload File</h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
            Drag & drop or click to browse.
          </p>

          <FileDrop
            onFileSelected={onFileSelected}
            selectedFile={selectedFile}
          />

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleReview}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              Review
            </button>

            <button
              onClick={handleClear}
              className="bg-white dark:bg-gray-900 border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Paste Code */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Or Paste Code</h3>

          <CodeMirror
            value={pastedCode}
            height="250px"
            theme={theme === "dark" ? vscodeDark : "light"}
            extensions={[javascript()]}
            onChange={setPastedCode}
            className="rounded-lg overflow-hidden"
          />

          <div className="mt-3 flex gap-3">
            <button
              onClick={handleReview}
              disabled={loading}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              Review Pasted Code
            </button>

            <button
              onClick={() => setPastedCode("")}
              className="bg-white dark:bg-gray-900 border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL (Results) */}
      <div ref={resultRef}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg min-h-[350px] border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Review Results</h3>

          {loading && (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          )}

          {!loading && !report && (
            <p className="text-sm text-gray-500">No review yet.</p>
          )}

          {report && <ReportView report={report} />}
        </div>
      </div>
    </div>
  );
}
