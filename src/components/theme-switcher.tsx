"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { cn } from "@/utils/class-name";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents hydration mismatch
    return <div className="bg-muted h-6 w-12 animate-pulse rounded-full" />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 ease-in-out",
        "focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none",
        "hover:scale-105 active:scale-95",
        resolvedTheme === "dark"
          ? "bg-slate-800"
          : "bg-gradient-to-r from-amber-100 to-amber-200",
      )}
      aria-label="테마 전환"
    >
      <span
        className={cn(
          "inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out",
          resolvedTheme === "dark" ? "translate-x-7" : "translate-x-0.5",
        )}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-3 w-3 text-blue-500" />
        ) : (
          <Sun className="h-3 w-3 text-amber-500" />
        )}
      </span>
    </button>
  );
}
