"use client";

import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/common/shadcn/button";
import MarketIntroEditor from "@/components/mypage/market-intro-editor";
import { copyToClipboard } from "@/utils/clipboard";

const BASE_URL = "https://selling-box.com";

export default function MarketInfo({ userId }: { userId: string }) {
  const marketUrl = `${BASE_URL}/${userId}`;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(marketUrl);
    if (success) {
      toast.success("링크가 복사되었습니다!");
    } else {
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="flex w-full max-w-6xl flex-col justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">내 마켓 정보</h1>

      <div className="bg-muted flex flex-col gap-1 rounded-md p-4 sm:flex-row">
        <span>내 마켓 바로가기:</span>
        <Link
          href={`/${userId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-blue-600 underline hover:text-blue-800"
        >
          {marketUrl}
        </Link>
        <Button
          onClick={handleCopyLink}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto sm:shrink-0"
        >
          링크 복사
        </Button>
      </div>

      <MarketIntroEditor userId={userId} />
    </div>
  );
}
