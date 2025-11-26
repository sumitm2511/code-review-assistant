// src/components/ui/EditorPanel.jsx
import React, { useRef, useState, useEffect } from "react";
import FileDrop from "./FileDrop";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiUpload, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

/**
 * EditorPanel props:
 * - selectedFile, setSelectedFile
 * - pastedCode, setPastedCode
 * - loading
 * - onReview({ triggerSuccess })
 * - onClear()
 * - theme ('light' | 'dark')
 *
 * This component contains:
 * - Top area: small header + link to uploaded assignment
 * - Big combined area: FileDrop OR editor preview above CodeMirror (same vertical space)
 * - Controls: Review (primary), Clear (secondary), small upload hint
 * - Success animation using framer-motion
 */
const ASSIGNMENT_PDF = "/mnt/data/_Code Review Assistant_ 10 (1).pdf";

export default function EditorPanel({
  selectedFile,
  setSelectedFile,
  pastedCode,
  setPastedCode,
  loading,
  onReview,
  onClear,
  theme,
}) {
  const [animSuccess, setAnimSuccess] = useState(false);
  const editorRef = useRef(null);

  // triggerSuccess passed back to parent so parent can call it after review success
  function triggerSuccess() {
    setAnimSuccess(true);
    setTimeout(() => setAnimSuccess(false), 1800);
  }

  // Auto-resize helper (we approximate by toggling an internal style)
  const [editorHeight, setEditorHeight] = useState("260px");
  useEffect(() => {
    // grow/shrink depending on content length (simple heuristic)
    const lines = (pastedCode || "").split("\n").length;
    const h = Math.min(800, Math.max(200, Math.min(40 * lines + 40, 520)));
    setEditorHeight(`${h}px`);
  }, [pastedCode]);

  // helper that runs before review to show animation when done
  async function handleReviewClick() {
    await onReview({ triggerSuccess });
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">Code input</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
            Drag a file into the panel or paste code in the editor below. You can
            review either the uploaded file or the code typed here.
          </div>
        </div>

        <div className="text-right">
          <a
            href={ASSIGNMENT_PDF}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-sky-600 hover:underline"
          >
            Open assignment brief
          </a>
        </div>
      </div>

      {/* Combined panel */}
      <div className="mt-4 grid gap-4">
        {/* Drag/Drop box sits visually at the top of the editor; when selected shows filename inline */}
        <div className="transition rounded-lg overflow-hidden">
          <FileDrop
            onFileSelected={(file) => {
              setSelectedFile(file);
              // also set pastedCode to file preview (optional) - we keep minimal: don't auto-read
            }}
            selectedFile={selectedFile}
          />
        </div>

        {/* Editor / CodeMirror */}
        <div
          className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          style={{ minHeight: 120 }}
        >
          <CodeMirror
            value={pastedCode}
            height={editorHeight}
            theme={theme === "dark" ? vscodeDark : vscodeLight}
            extensions={[javascript()]}
            onChange={(v) => setPastedCode(v)}
            className="bg-transparent"
            ref={editorRef}
          />
        </div>
      </div>

      {/* Footer controls */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleReviewClick}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold
                       bg-gradient-to-br from-sky-600 to-indigo-600 text-white hover:from-sky-700 hover:to-indigo-700
                       disabled:opacity-60 disabled:cursor-not-allowed transition"
            aria-label="Run review"
          >
            <FiUpload />
            Review
          </button>

          <button
            onClick={() => {
              setSelectedFile(null);
              setPastedCode("");
              onClear?.();
              toast("Cleared");
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <FiTrash2 />
            Clear
          </button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          Tip: press Review to analyze the selected file or the code above.
        </div>
      </div>

      {/* Success badge animation */}
      <div className="relative mt-4">
        <AnimatePresence>
          {animSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute right-4 top-0"
            >
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full shadow">
                <FiCheck />
                <span className="text-sm font-semibold">Review saved</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
