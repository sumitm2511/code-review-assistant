import { useEffect, useState } from "react";
import { api } from "../api/client";
import toast from "react-hot-toast";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadReports() {
    try {
      const resp = await api.get("/reports");
      setReports(resp.data || []);
    } catch (err) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Saved Reports</h1>

      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      )}

      {!loading && reports.length === 0 && (
        <div className="text-gray-600 dark:text-gray-400">
          No saved reports.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {reports.map((r, idx) => (
          <ReportCard key={idx} report={r} />
        ))}
      </div>
    </div>
  );
}

function ReportCard({ report }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{report.filename}</h3>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Created: {new Date(report.created_at).toLocaleString()}
      </p>

      <button
        onClick={() => window.open(`/reports/${report.file}`, "_blank")}
        className="mt-4 px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
      >
        Open Report
      </button>
    </div>
  );
}
