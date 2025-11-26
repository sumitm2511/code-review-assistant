const express = require("express");
const fs = require("fs-extra");
const path = require("path");

const router = express.Router();

// IMPORTANT — this must match where your reportSaver writes files
const REPORT_DIR = path.join(__dirname, "..", "..", "reports");

// List all reports
router.get("/", async (req, res) => {
  try {
    await fs.ensureDir(REPORT_DIR);

    const files = await fs.readdir(REPORT_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const reports = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(REPORT_DIR, file);
        const content = await fs.readJson(filePath).catch(() => null);

        return {
          file,
          filename: content?.filename || file,
          created_at: content?.created_at || "",
          input_length: content?.input_length || 0
        };
      })
    );

    res.json(reports.reverse()); // newest first
  } catch (err) {
    console.error("Error listing reports:", err);
    res.status(500).json({ error: "Unable to list reports" });
  }
});

// View report JSON
router.get("/view", async (req, res) => {
  try {
    const file = req.query.file;
    if (!file) return res.status(400).json({ error: "File is required" });

    const filePath = path.join(REPORT_DIR, file);
    if (!(await fs.pathExists(filePath))) return res.status(404).json({ error: "Report not found" });

    const jsonData = await fs.readJson(filePath);
    res.json(jsonData);
  } catch (err) {
    console.error("view error", err);
    res.status(500).json({ error: "Unable to view report" });
  }
});

// Download report JSON
router.get("/download", async (req, res) => {
  try {
    const file = req.query.file;
    if (!file) return res.status(400).json({ error: "File is required" });

    const filePath = path.join(REPORT_DIR, file);
    if (!(await fs.pathExists(filePath))) return res.status(404).json({ error: "Report not found" });

    res.download(filePath);
  } catch (err) {
    console.error("download error", err);
    res.status(500).json({ error: "Unable to download report" });
  }
});

module.exports = router;
