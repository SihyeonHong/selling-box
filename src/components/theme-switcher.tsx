"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/common/shadcn/button";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents hydration mismatch
    return <Button disabled>Loading...</Button>;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return <Button onClick={toggleTheme}>Dark / Light</Button>;
}
