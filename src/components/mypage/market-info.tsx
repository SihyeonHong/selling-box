"use client";

import MarketIntroEditor from "@/components/mypage/market-intro-editor";

export default function MarketInfo({ userId }: { userId: string }) {
  return (
    <div className="flex w-full flex-col gap-8 p-8">
      <h1 className="text-2xl font-bold">내 마켓 정보</h1>
      <MarketIntroEditor userId={userId} />
    </div>
  );
}
