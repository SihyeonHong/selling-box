"use client";

import { useTranslations } from "next-intl";

import Logo from "@/components/common/logo";
import { Button } from "@/components/common/shadcn/button";
import { ButtonGroup } from "@/components/common/shadcn/button-group";
import ThemeSwitcher from "@/components/theme-switcher";
import { Link } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("header");

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <ButtonGroup>
            <Button variant="outline" asChild>
              <Link href="/login">{t("login")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">{t("register")}</Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </header>
  );
}
