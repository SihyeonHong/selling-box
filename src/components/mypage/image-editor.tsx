"use client";

import { useRef } from "react";

import { Button } from "@/components/common/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Input } from "@/components/common/shadcn/input";
import Canvas from "@/components/mypage/canvas";
import CanvasPanel from "@/components/mypage/canvas-panel";
import useCutLines from "@/hooks/useCutLines";
import useDragHandler from "@/hooks/useDragHandler";

export default function ImageEditorContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    cutLines,
    setCutLines,
    addVerticalLine,
    addHorizontalLine,
    removeLine,
    clearAllLines,
    getStats,
  } = useCutLines();

  const { dragState, handleMouseDown } = useDragHandler({
    cutLines,
    setCutLines,
    containerRef,
  });

  const { verticalCount, horizontalCount, totalImages } = getStats();
  return (
    <div>
      <h1>Image Editor 타이틀</h1>
      <Input type="file" accept="image/*" placeholder="이미지 파일 선택" />
      <Card>
        <CardHeader>
          <CardTitle>편집 캔버스</CardTitle>
        </CardHeader>

        <CardContent>
          <Canvas
            containerRef={containerRef}
            cutLines={cutLines}
            isDragging={dragState.isDragging}
            onMouseDown={handleMouseDown}
            onRemoveLine={removeLine}
          />
          <CanvasPanel
            onAddVerticalLine={addVerticalLine}
            onAddHorizontalLine={addHorizontalLine}
            onClearAllLines={clearAllLines}
            verticalCount={verticalCount}
            horizontalCount={horizontalCount}
            totalImages={totalImages}
          />
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant="secondary">모든 작업 취소</Button>
        <Button>이렇게 분할해서 저장하기</Button>
      </div>
    </div>
  );
}
