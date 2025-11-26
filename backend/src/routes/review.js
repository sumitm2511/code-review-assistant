const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const reviewController = require('../controllers/reviewController');

// Multer config (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// --- Existing Routes ---
router.post('/file', upload.single('file'), reviewController.reviewFile);
router.post('/text', reviewController.reviewText);

// --- NEW: List all saved reports ---
router.get('/list', (req, res) => {
  const reportsDir = path.join(__dirname, '..', '..', 'reports');

  if (!fs.existsSync(reportsDir)) {
    return res.json({ reports: [] });
  }

  const files = fs.readdirSync(reportsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const fullPath = path.join(reportsDir, f);
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

      return {
        filename: data.filename,
        created_at: data.created_at,
        path: `http://localhost:4000/reports/${f}`
      };
    });

  res.json({ reports: files });
});

module.exports = router;
