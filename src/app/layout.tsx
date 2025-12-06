import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { Toaster } from "@/components/common/shadcn/sonner";
import { ThemeProvider } from "@/provider/theme-provider";
import "@/styles/globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // 필요한 굵기만 로드
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "얼마예요",
  description: "판매 중인 물건을 한 눈에 둘러보세요",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${notoSans.className} antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
