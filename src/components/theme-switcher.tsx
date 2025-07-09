"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevents hydration mismatch
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="cursor-pointer p-2 rounded-sm dark:text-gray-800 dark:bg-white"
      onClick={toggleTheme}
    >
      Dark / Light
    </button>
  );
}
