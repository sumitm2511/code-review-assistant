// src/components/ui/FileDrop.jsx
import React, { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";

export default function FileDrop({ onFileSelected, selectedFile }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleFiles = (files) => {
    const file = files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      animate={{
        scale: isDragging ? 1.01 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative cursor-pointer select-none`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <motion.div
        className={`w-full p-8 rounded-2xl border-2 border-dashed transition-all bg-white dark:bg-gray-800
          ${isDragging ? "border-sky-500 shadow-lg bg-sky-50/40 dark:bg-sky-900/20" : "border-gray-300 dark:border-gray-700"}
        `}
        animate={{
          borderColor: isDragging ? "#38bdf8" : "#d1d5db",
        }}
      >
        {!selectedFile ? (
          <div className="flex flex-col items-center text-center text-gray-600 dark:text-gray-300">
            <motion.div animate={{ y: isDragging ? -6 : 0 }}>
              <FiUploadCloud size={40} className="text-sky-500 mb-2" />
            </motion.div>
            <div className="text-lg font-medium">Drag & Drop to Upload</div>
            <div className="text-xs mt-1">or click to browse • max 2MB</div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center gap-3 text-green-600 dark:text-green-400"
          >
            <FiCheckCircle size={28} />
            <div>
              <div className="text-sm opacity-70">Selected file</div>
              <div className="font-medium">{selectedFile.name}</div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
