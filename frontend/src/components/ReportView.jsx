// src/components/ui/ReportView.jsx
import React from "react";

/* --------------------------------------------
   Deep-safe stringifier to prevent React crashes
--------------------------------------------- */
function toSafeString(value) {
  try {
    if (value === null || value === undefined) return "—";
    if (typeof value === "string") return value;
    return JSON.stringify(value, null, 2);  // safely stringify objects
  } catch {
    return String(value);
  }
}

/* --------------------------------------------
   Try to parse JSON from Groq output
--------------------------------------------- */
function tryParseJson(text) {
  if (!text) return null;
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
  } catch {}
  return null;
}

export default function ReportView({ report }) {
  let parsed = null;

  if (typeof report?.review === "string") {
    parsed = tryParseJson(report.review);
  } else if (typeof report?.review === "object") {
    parsed = report.review;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto mt-8">
      <h3 className="text-xl font-bold mb-3">Review Result</h3>

      <p className="text-sm text-gray-500 mb-4">
        <strong>Filename:</strong> {toSafeString(report?.filename)}
        <strong className="ml-2">Saved at:</strong> {toSafeString(report?.created_at)}
      </p>

      {/* If JSON is valid */}
      {parsed ? (
        <div className="space-y-6">

          {/* Summary */}
          <section>
            <h4 className="font-semibold mb-1">Summary</h4>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
              {toSafeString(parsed.summary)}
            </pre>
          </section>

          {/* Severity Findings */}
          <section>
            <h4 className="font-semibold mb-1">Severity Findings</h4>

            {Array.isArray(parsed.severity_findings) &&
            parsed.severity_findings.length > 0 ? (
              <ul className="list-disc pl-6 space-y-2">
                {parsed.severity_findings.map((finding, idx) => (
                  <li key={idx}>
                    <div className="text-sm">
                      <strong>{toSafeString(finding.severity).toUpperCase()}</strong>{" "}
                      — {toSafeString(finding.issue)}
                    </div>

                    {finding.suggestion && (
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                        {toSafeString(finding.suggestion)}
                      </pre>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No structured severity findings.</p>
            )}
          </section>

          {/* Refactor Example */}
          {parsed.refactor_example && (
            <section>
              <h4 className="font-semibold mb-1">Refactor Example</h4>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {toSafeString(parsed.refactor_example)}
              </pre>
            </section>
          )}

          {/* Suggestions */}
          {Array.isArray(parsed.suggestions) &&
          parsed.suggestions.length > 0 ? (
            <section>
              <h4 className="font-semibold mb-1">Suggestions</h4>
              <ol className="list-decimal pl-6 space-y-1">
                {parsed.suggestions.map((item, idx) => (
                  <li key={idx} className="text-sm">
                    {toSafeString(item)}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      ) : (
        /* If parsing fails → raw response */
        <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
          {toSafeString(report?.review)}
        </pre>
      )}
    </div>
  );
}
