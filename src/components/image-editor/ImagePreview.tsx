import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  ImageInfo,
  VerticalLine,
  HorizontalLine,
  LineType,
} from "@/types/image-editor";
import { calculateImageRect } from "@/utils/image-editor";

import { LineOverlay } from "./LineOverlay";

interface ImagePreviewProps {
  imageInfo: ImageInfo;
  imageContainerRef: React.RefObject<HTMLDivElement | null>;
  verticalLines: VerticalLine[];
  horizontalLines: HorizontalLine[];
  onLineMouseDown: (
    e: React.MouseEvent,
    lineId: string,
    lineType: LineType,
  ) => void;
  onLineTouchStart: (
    e: React.TouchEvent,
    lineId: string,
    lineType: LineType,
  ) => void;
  onRemoveVerticalLine: (lineId: string) => void;
  onRemoveHorizontalLine: (lineId: string) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageInfo,
  imageContainerRef,
  verticalLines,
  horizontalLines,
  onLineMouseDown,
  onLineTouchStart,
  onRemoveVerticalLine,
  onRemoveHorizontalLine,
}) => {
  const [imageRect, setImageRect] = useState<{
    left: number;
    width: number;
    top: number;
    height: number;
  } | null>(null);

  // 이미지 영역 계산
  useEffect(() => {
    const updateImageRect = () => {
      if (imageContainerRef.current) {
        const containerRect = imageContainerRef.current.getBoundingClientRect();
        const rect = calculateImageRect(
          containerRect,
          imageInfo.width,
          imageInfo.height,
        );
        setImageRect({
          left: rect.left - containerRect.left,
          width: rect.width,
          top: rect.top - containerRect.top,
          height: rect.height,
        });
      }
    };

    updateImageRect();
    window.addEventListener("resize", updateImageRect);
    return () => window.removeEventListener("resize", updateImageRect);
  }, [imageInfo, imageContainerRef]);

  return (
    <div className="relative">
      {/* 위쪽 크기 표시 */}
      <div className="mb-2 flex justify-between text-xs">
        <span className="ml-8">0</span>
        <span>{imageInfo.width}px</span>
      </div>

      <div className="flex">
        {/* 왼쪽 크기 표시 */}
        <div className="flex flex-col justify-between pr-2 text-right text-xs">
          <span>0</span>
          <span>{imageInfo.height}px</span>
        </div>

        {/* 이미지 컨테이너 */}
        <div
          ref={imageContainerRef}
          className="relative flex-1 overflow-visible border"
          onDragStart={(e) => e.preventDefault()}
        >
          <Image
            src={imageInfo.url}
            alt="미리보기"
            width={imageInfo.width}
            height={imageInfo.height}
            className="h-auto max-h-96 w-full object-contain"
            draggable={false}
          />

          {imageRect && (
            <LineOverlay
              verticalLines={verticalLines}
              horizontalLines={horizontalLines}
              imageInfo={imageInfo}
              imageRect={imageRect}
              onLineMouseDown={onLineMouseDown}
              onLineTouchStart={onLineTouchStart}
              onRemoveVerticalLine={onRemoveVerticalLine}
              onRemoveHorizontalLine={onRemoveHorizontalLine}
            />
          )}
        </div>
      </div>
    </div>
  );
};
