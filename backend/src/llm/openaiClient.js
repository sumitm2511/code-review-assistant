// backend/src/llm/openaiClient.js
const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function reviewWithOpenAI(prompt) {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You MUST return ONLY valid JSON.
Follow these strict rules:

1. ALL values must be strings. 
2. NO nested objects allowed.
3. If something is complex (like code), return it as a STRING.
4. severity_findings must be an array of objects, but EACH FIELD must be a STRING.
5. NEVER return objects like { "code": "...", "description": "..." }.
6. Replace any uncertain values with an empty string "".

JSON SCHEMA:

{
  "summary": "string",
  "severity_findings": [
    {
      "line_or_snippet": "string",
      "issue": "string",
      "severity": "low | medium | high",
      "suggestion": "string"
    }
  ],
  "suggestions": ["string"],
  "refactor_example": "string"
}

Return ONLY the JSON. No text outside JSON.
`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 1500,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("Groq API ERROR:", err);
    throw err;
  }
}

module.exports = { reviewWithOpenAI };
