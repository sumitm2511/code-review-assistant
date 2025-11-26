// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiZap, FiShield, FiStar } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI-Powered Code Review —  
          <span className="text-sky-500"> Instantly.</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 leading-relaxed">
          Upload or paste your code and get detailed reviews powered by the
          latest Llama-3 AI — including bug detection, refactoring, performance
          insights, and security warnings.
        </p>

        {/* CTA Button */}
        <Link
          to="/review"
          className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-lg shadow-lg transition"
        >
          Start Reviewing →
        </Link>

        {/* Feature Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          <Feature icon={<FiZap />} title="Fast Reviews" desc="Lightning-quick analysis with Llama-3." />
          <Feature icon={<FiShield />} title="Detect Bugs" desc="Find vulnerabilities & hidden issues." />
          <Feature icon={<FiStar />} title="Pro-Level Feedback" desc="Readable, structured, engineer-ready." />

        </div>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700"
    >
      <div className="text-sky-500 mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
    </motion.div>
  );
}
