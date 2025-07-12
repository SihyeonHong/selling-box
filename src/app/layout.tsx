import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { MyLayoutProps } from "@/types/props";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // 필요한 굵기만 로드
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "셀링 박스 Selling Box",
  description: "판매 중인 물건을 한 눈에 둘러보세요",
};

export default async function RootLayout({ children, params }: MyLayoutProps) {
  const resolvedParams = await params;

  return (
    <html lang={resolvedParams?.locale || "ko"} suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${notoSans.className} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
