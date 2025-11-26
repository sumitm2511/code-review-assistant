// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Reports from "./pages/Reports";

import { useTheme } from "./store/useTheme";

export default function App() {
  const { theme } = useTheme();

  // Apply dark/light mode to the entire document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/review" element={<Review />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>

        {/* Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}
