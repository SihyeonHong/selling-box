import ThemeSwitcher from "@/components/theme-switcher";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("title");

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1>{t("title")}</h1>
      <ThemeSwitcher />
    </div>
  );
}
