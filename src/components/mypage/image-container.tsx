"use client";

import Image from "next/image";
import { useState, useRef } from "react";

import { Input } from "@/components/common/shadcn/input";
import { ImageInfo } from "@/types/image";

export default function ImageContainer() {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
          setImageInfo({
            width: img.naturalWidth,
            height: img.naturalHeight,
            url: e.target?.result as string,
            fileName: file.name,
          });
        };
        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 p-4">
      <div className="space-y-2">
        <label className="text-foreground text-sm font-medium">
          이미지 파일 선택
        </label>
        <div className="flex gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            onClick={handleButtonClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
          >
            파일 선택
          </button>
        </div>
      </div>

      {imageInfo && (
        <div className="space-y-4">
          <div className="relative">
            {/* 위쪽 크기 표시 */}
            <div className="mb-2 flex justify-between text-xs">
              <span className="ml-8">0</span>
              <span>{imageInfo.width}</span>
            </div>

            <div className="flex">
              {/* 왼쪽 크기 표시 */}
              <div className="flex flex-col justify-between pr-2 text-right text-xs">
                <span>0</span>
                <span>{imageInfo.height}</span>
              </div>

              {/* 이미지 */}
              <div className="flex-1 overflow-hidden border">
                <Image
                  src={imageInfo.url}
                  alt="미리보기"
                  width={imageInfo.width}
                  height={imageInfo.height}
                  className="h-auto max-h-96 w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-md p-3">
            <h3 className="text-foreground mb-2 text-sm font-medium">
              이미지 정보
            </h3>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">
                파일명: {imageInfo.fileName}
              </p>
              <p className="text-muted-foreground text-sm">
                크기: {imageInfo.width} × {imageInfo.height} 픽셀
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
