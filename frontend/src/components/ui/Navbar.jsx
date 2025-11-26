// src/components/ui/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../store/useTheme";
import { FiSun, FiMoon, FiCode, FiFileText } from "react-icons/fi";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FiCode size={22} className="text-sky-500" />
          <span className="text-xl font-semibold">CodeReview.ai</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <NavLink
            to="/"
            className="hover:text-sky-500 transition"
          >
            Home
          </NavLink>

          <NavLink
            to="/review"
            className="hover:text-sky-500 transition"
          >
            Review
          </NavLink>

          <NavLink
            to="/reports"
            className="hover:text-sky-500 transition flex items-center gap-1"
          >
            <FiFileText /> Reports
          </NavLink>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
