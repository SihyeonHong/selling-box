"use client";

import { Button } from "@/components/common/shadcn/button";

interface CanvasPanelProps {
  onAddVerticalLine: () => void;
  onAddHorizontalLine: () => void;
  onClearAllLines: () => void;
  verticalCount: number;
  horizontalCount: number;
  totalImages: number;
}

export default function CanvasPanel({
  onAddVerticalLine,
  onAddHorizontalLine,
  onClearAllLines,
  verticalCount,
  horizontalCount,
  totalImages,
}: CanvasPanelProps) {
  return (
    <div className="my-4 flex gap-4">
      <Button onClick={onAddVerticalLine}>| 세로 절취선 추가</Button>
      <Button onClick={onAddHorizontalLine}>- 가로 절취선 추가</Button>
      <Button onClick={onClearAllLines} variant="outline">
        모든 절취선 삭제
      </Button>
      <div className="text-sm text-gray-600">
        세로 절취선: {verticalCount}개
      </div>
      <div className="text-sm text-gray-600">
        가로 절취선: {horizontalCount}개
      </div>
      <div className="text-sm font-medium">분할될 이미지: {totalImages}개</div>
    </div>
  );
}
