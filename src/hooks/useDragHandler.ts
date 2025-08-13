import { useState, useEffect, useCallback, RefObject } from "react";

import { CutLineType } from "@/types/market";

interface DragState {
  isDragging: boolean;
  lineId: string | null;
  startPos: number;
}

interface UseDragHandlerProps {
  cutLines: CutLineType[];
  setCutLines: React.Dispatch<React.SetStateAction<CutLineType[]>>;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function useDragHandler({
  cutLines,
  setCutLines,
  containerRef,
}: UseDragHandlerProps) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    lineId: null,
    startPos: 0,
  });

  const handleMouseDown = (e: React.MouseEvent, lineId: string) => {
    e.preventDefault();

    // containerRef가 null이면 드래그 시작하지 않음
    if (!containerRef) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const line = cutLines.find((l) => l.id === lineId);
    if (!line) return;

    const startPos =
      line.type === "vertical"
        ? ((e.clientX - rect.left) / rect.width) * 100
        : ((e.clientY - rect.top) / rect.height) * 100;

    setDragState({
      isDragging: true,
      lineId,
      startPos,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging || !dragState.lineId) return;
      if (!containerRef) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const line = cutLines.find((l) => l.id === dragState.lineId);
      if (!line) return;

      let newPosition;
      if (line.type === "vertical") {
        newPosition = ((e.clientX - rect.left) / rect.width) * 100;
        newPosition = Math.max(5, Math.min(95, newPosition));
      } else {
        newPosition = ((e.clientY - rect.top) / rect.height) * 100;
        newPosition = Math.max(5, Math.min(95, newPosition));
      }

      setCutLines((prev) =>
        prev.map((l) =>
          l.id === dragState.lineId ? { ...l, position: newPosition } : l,
        ),
      );
    },
    [dragState, cutLines, setCutLines, containerRef],
  );

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      lineId: null,
      startPos: 0,
    });
  }, []);

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return {
    dragState,
    handleMouseDown,
  };
}
