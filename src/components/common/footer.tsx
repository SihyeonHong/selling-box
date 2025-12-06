"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
          <p className="text-muted-foreground text-sm">{t("copyright")}</p>
          <div className="text-muted-foreground flex space-x-4 text-sm">
            {/* <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              {t("terms")}
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
