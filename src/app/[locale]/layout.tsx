import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { MyLayoutProps } from "@/types/props";

export default async function LocaleLayout({
  children,
  params,
}: MyLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
