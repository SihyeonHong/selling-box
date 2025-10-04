"use client";

import Logo from "@/components/common/logo";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
