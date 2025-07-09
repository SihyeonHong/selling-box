import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "ko",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
