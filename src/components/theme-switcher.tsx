"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents hydration mismatch
    return (
      <button className="text-foreground bg-background cursor-pointer rounded-sm p-2">
        ...
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="text-foreground bg-background cursor-pointer rounded-sm p-2"
      onClick={toggleTheme}
    >
      Dark / Light
    </button>
  );
}
