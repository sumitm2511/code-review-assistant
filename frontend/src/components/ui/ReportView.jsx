import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function ReportView({ report }) {
  const parsed = report.review;

  if (!parsed || typeof parsed !== "object") {
    return (
      <div className="p-4 text-sm bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 rounded-xl">
        Invalid JSON received from the AI model.  
        <br />Try again or check raw output in backend logs.
      </div>
    );
  }

  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <section className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <p className="text-gray-700 dark:text-gray-300">{parsed.summary}</p>
      </section>

      {/* Findings Accordion */}
      <section>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-lg"
        >
          <span className="text-md font-medium">Findings</span>
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {open && (
          <div className="mt-3 space-y-3">
            {parsed.severity_findings?.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white dark:bg-gray-800 border rounded-xl"
              >
                <p className="font-semibold text-sm">{item.issue}</p>
                <p className="text-xs text-gray-500">{item.line_or_snippet}</p>
                <p className="mt-2 text-sm">{item.suggestion}</p>

                <span
                  className={`inline-block mt-3 px-2 py-1 text-xs rounded ${
                    item.severity === "high"
                      ? "bg-red-500 text-white"
                      : item.severity === "medium"
                      ? "bg-yellow-500 text-black"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {item.severity}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Suggestions */}
      <section className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <h2 className="text-lg font-semibold mb-3">Suggestions</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
          {parsed.suggestions?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      {/* Refactor Example */}
      {parsed.refactor_example && (
        <section className="p-4 bg-gray-900 text-gray-100 rounded-xl font-mono text-sm">
          <h2 className="mb-2">Refactor Example</h2>
          <pre>{parsed.refactor_example}</pre>
        </section>
      )}
    </div>
  );
}
