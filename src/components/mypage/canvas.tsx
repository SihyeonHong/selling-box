"use client";

import { RefObject } from "react";

import NoImage from "@/components/common/no-image";
import CutLine from "@/components/mypage/ui/cut-line";
import { CutLineType } from "@/types/market";

interface CanvasProps {
  containerRef: RefObject<HTMLDivElement | null>;
  cutLines: CutLineType[];
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent, lineId: string) => void;
  onRemoveLine: (lineId: string) => void;
}

export default function Canvas({
  containerRef,
  cutLines,
  isDragging,
  onMouseDown,
  onRemoveLine,
}: CanvasProps) {
  return (
    <div
      ref={containerRef}
      className="relative border border-dashed border-gray-300 bg-gray-50"
      style={{ cursor: isDragging ? "grabbing" : "default" }}
    >
      <NoImage rounded="none" size="xl" />

      {cutLines.map((line) => (
        <CutLine
          key={line.id}
          line={line}
          onMouseDown={onMouseDown}
          onRemove={onRemoveLine}
        />
      ))}
    </div>
  );
}
