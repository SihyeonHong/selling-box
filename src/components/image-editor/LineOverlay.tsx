import React from "react";

import { VerticalLine, HorizontalLine, LineType } from "@/types/image-editor";
import { pixelToPercentage } from "@/utils/image-editor";

interface LineOverlayProps {
  verticalLines: VerticalLine[];
  horizontalLines: HorizontalLine[];
  imageInfo: { width: number; height: number };
  imageRect: {
    left: number;
    width: number;
    top: number;
    height: number;
  };
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

export const LineOverlay: React.FC<LineOverlayProps> = ({
  verticalLines,
  horizontalLines,
  imageInfo,
  imageRect,
  onLineMouseDown,
  onLineTouchStart,
  onRemoveVerticalLine,
  onRemoveHorizontalLine,
}) => {
  return (
    <>
      {/* 수직선들 */}
      {verticalLines.map((line) => {
        // 실제 이미지 영역 내에서의 위치 계산
        const percentage = pixelToPercentage(line.position, imageInfo.width);
        const actualLeft =
          imageRect.left + (percentage / 100) * imageRect.width;

        return (
          <div
            key={line.id}
            className="absolute top-0 bottom-0 z-10 w-0.5 cursor-ew-resize bg-red-500"
            style={{
              left: `${actualLeft}px`,
              top: `${imageRect.top}px`,
              height: `${imageRect.height}px`,
            }}
            onMouseDown={(e) => onLineMouseDown(e, line.id, "vertical")}
            onTouchStart={(e) => onLineTouchStart(e, line.id, "vertical")}
          >
            {/* 상단 픽셀 위치 표시 */}
            <div className="absolute -top-8 left-1/2 z-20 -translate-x-1/2 transform rounded bg-red-500 px-2 py-1 text-xs whitespace-nowrap text-white shadow-md">
              {line.position}px
            </div>

            {/* 하단 제거 버튼 */}
            <button
              className="absolute -bottom-8 left-1/2 z-20 flex h-5 w-5 -translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-sm text-white shadow-md hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveVerticalLine(line.id);
              }}
            >
              ×
            </button>
          </div>
        );
      })}

      {/* 수평선들 */}
      {horizontalLines.map((line) => {
        // 실제 이미지 영역 내에서의 위치 계산
        const percentage = pixelToPercentage(line.position, imageInfo.height);
        const actualTop = imageRect.top + (percentage / 100) * imageRect.height;

        return (
          <div
            key={line.id}
            className="absolute z-10 h-0.5 cursor-ns-resize bg-green-500"
            style={{
              left: `${imageRect.left}px`,
              top: `${actualTop}px`,
              width: `${imageRect.width}px`,
            }}
            onMouseDown={(e) => onLineMouseDown(e, line.id, "horizontal")}
            onTouchStart={(e) => onLineTouchStart(e, line.id, "horizontal")}
          >
            {/* 왼쪽 픽셀 위치 표시 */}
            <div className="absolute top-1/2 -left-8 z-20 -translate-y-1/2 transform rounded bg-green-500 px-2 py-1 text-xs whitespace-nowrap text-white shadow-md">
              {line.position}px
            </div>

            {/* 오른쪽 제거 버튼 */}
            <button
              className="absolute top-1/2 -right-8 z-20 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center rounded-full bg-green-500 text-sm text-white shadow-md hover:bg-green-600"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveHorizontalLine(line.id);
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </>
  );
};
