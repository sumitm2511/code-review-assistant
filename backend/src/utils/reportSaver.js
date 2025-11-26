const fs = require('fs-extra');
const path = require('path');

const REPORT_DIR = path.join(__dirname, '..', '..', 'reports');

async function ensureDir() {
  await fs.ensureDir(REPORT_DIR);
}

async function saveReport(report) {
  await ensureDir();
  const filename = `report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  const filepath = path.join(REPORT_DIR, filename);
  await fs.writeJson(filepath, report, { spaces: 2 });
  return filepath;
}

module.exports = { saveReport };
