const fs = require("fs-extra");
const path = require("path");
const openaiClient = require("../llm/openaiClient");
const reportSaver = require("../utils/reportSaver");

const MAX_CODE_LENGTH = 40000;

// GROQ-safe JSON extractor
function extractJSON(text) {
  if (!text) return null;

  try {
    text = text.replace(/```json/gi, "")
               .replace(/```/g, "")
               .trim();

    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first === -1 || last === -1) return null;

    const block = text.slice(first, last + 1);

    return JSON.parse(block);

  } catch (err) {
    console.error("❌ JSON extraction failed:", err);
    return null;
  }
}

// Build LLM prompt
function buildPrompt(code, filename) {
  return `
You are a senior software engineer. Produce a JSON object ONLY.

Required keys:
- summary
- severity_findings (array)
- suggestions (array)
- refactor_example

Here is the code:

\`\`\`
${code}
\`\`\`
`;
}

// Handle file upload review
exports.reviewFile = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded." });

    const filename = req.file.originalname || "uploaded_code";
    let code = req.file.buffer.toString("utf8");

    if (code.length > MAX_CODE_LENGTH) {
      code += "\n/* TRUNCATED DUE TO SIZE */";
    }

    const prompt = buildPrompt(code, filename);
    const llmResp = await openaiClient.reviewWithOpenAI(prompt);

    const parsed = extractJSON(llmResp);

    const report = {
      filename,
      input_length: code.length,
      created_at: new Date().toISOString(),
      model_response: parsed || llmResp,
    };

    const reportPath = await reportSaver.saveReport(report);

    return res.json({
      ok: true,
      valid_json: !!parsed,
      review: parsed || null,
      raw_output: llmResp,
      report_path: reportPath,
    });

  } catch (err) {
    console.error("reviewFile error", err);
    return res.status(500).json({ error: err.message });
  }
};

// Handle pasted text review
exports.reviewText = async (req, res) => {
  try {
    const { code, filename = "pasted_code" } = req.body;
    if (!code)
      return res.status(400).json({ error: "Missing 'code'." });

    const prompt = buildPrompt(code, filename);
    const llmResp = await openaiClient.reviewWithOpenAI(prompt);

    const parsed = extractJSON(llmResp);

    const report = {
      filename,
      input_length: code.length,
      created_at: new Date().toISOString(),
      model_response: parsed || llmResp,
    };

    const reportPath = await reportSaver.saveReport(report);

    return res.json({
      ok: true,
      valid_json: !!parsed,
      review: parsed || null,
      raw_output: llmResp,
      report_path: reportPath,
    });

  } catch (err) {
    console.error("reviewText error", err);
    return res.status(500).json({ error: err.message });
  }
};
