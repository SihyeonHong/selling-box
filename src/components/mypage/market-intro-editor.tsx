"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import NoImage from "@/components/common/no-image";
import { Button } from "@/components/common/shadcn/button";
import { Card, CardContent } from "@/components/common/shadcn/card";
import { Input } from "@/components/common/shadcn/input";
import { Label } from "@/components/common/shadcn/label";
import { Textarea } from "@/components/common/shadcn/textarea";
import { Market } from "@/types/market";

export default function MarketIntroEditor({ userId }: { userId: string }) {
  const [marketInfo, setMarketInfo] = useState<Market>({
    userId: userId,
    marketName: userId + "의 마켓",
    description: "프사에 있는 QR 옾챗이나 트위터 디엠 주세요",
    profileImg: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMarketInfo({ ...marketInfo, profileImg: URL.createObjectURL(file) });
    }
  };

  const handleResetImage = () => {
    setMarketInfo({ ...marketInfo, profileImg: "" });
  };

  return (
    <Card className="w-full max-w-6xl gap-0">
      <CardContent className="flex gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {marketInfo.profileImg ? (
              <Image
                src={marketInfo.profileImg}
                alt={marketInfo.marketName}
                width={200}
                height={200}
                className="cursor-pointer rounded-full"
                onClick={handleImageClick}
              />
            ) : (
              <div onClick={handleImageClick} className="cursor-pointer">
                <NoImage size="lg" />
              </div>
            )}
            {/* 우측 하단 + 기호 오버레이 */}
            <div
              className="hover:bg-primary absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 drop-shadow-lg transition-all duration-200 hover:text-white hover:drop-shadow-xl"
              onClick={handleImageClick}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button variant="outline" size="sm" onClick={handleResetImage}>
            기본 이미지로 초기화
          </Button>
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="marketName" className="text-sm font-medium">
              마켓 이름
            </Label>
            <Input
              id="marketName"
              defaultValue={marketInfo.marketName || ""}
              className="text-lg font-semibold"
              placeholder="마켓 이름을 입력하세요"
              onChange={(e) =>
                setMarketInfo({ ...marketInfo, marketName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              마켓 설명
            </Label>
            <Textarea
              id="description"
              defaultValue={marketInfo.description || ""}
              className="min-h-[120px] resize-none whitespace-pre-wrap"
              placeholder="마켓에 대한 설명을 입력하세요"
              onChange={(e) =>
                setMarketInfo({ ...marketInfo, description: e.target.value })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
