import ThemeSwitcher from "@/components/theme-switcher";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function page() {
  const t = await getTranslations("title");

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1>{t("title")}</h1>
      <ThemeSwitcher />
      <Link href={`/tester`} className="hover:underline">
        Tester Page
      </Link>
      <Link href={`/violet123`} className="hover:underline">
        사용자 violet123의 페이지
      </Link>
    </div>
  );
}
