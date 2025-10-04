import { useState, useRef, useCallback } from "react";

import {
  ImageInfo,
  VerticalLine,
  HorizontalLine,
  LineType,
} from "@/types/image-editor";
import {
  convertToImagePixel,
  calculateImageRect,
  createVerticalLine,
  createHorizontalLine,
} from "@/utils/image-editor";

export const useImageEditor = () => {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [verticalLines, setVerticalLines] = useState<VerticalLine[]>([]);
  const [horizontalLines, setHorizontalLines] = useState<HorizontalLine[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingLineId, setDraggingLineId] = useState<string | null>(null);
  const [draggingLineType, setDraggingLineType] = useState<LineType | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      // 기존 선들 초기화
      setVerticalLines([]);
      setHorizontalLines([]);

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
        img.onerror = () => {
          console.error("이미지 로드 실패");
          // 필요시 에러 상태를 추가할 수 있음
        };
        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        console.error("파일 읽기 실패");
      };

      reader.readAsDataURL(file);
    }
  };

  const addVerticalLine = () => {
    if (!imageInfo) return;
    const newLine = createVerticalLine(imageInfo.width);
    setVerticalLines([...verticalLines, newLine]);
  };

  const addHorizontalLine = () => {
    if (!imageInfo) return;
    const newLine = createHorizontalLine(imageInfo.height);
    setHorizontalLines([...horizontalLines, newLine]);
  };

  const removeVerticalLine = (lineId: string) => {
    setVerticalLines(verticalLines.filter((line) => line.id !== lineId));
  };

  const removeHorizontalLine = (lineId: string) => {
    setHorizontalLines(horizontalLines.filter((line) => line.id !== lineId));
  };

  const clearAllLines = () => {
    setVerticalLines([]);
    setHorizontalLines([]);
  };

  // 공통 함수: 선 위치 업데이트
  const updateLinePosition = useCallback(
    (
      lines: VerticalLine[] | HorizontalLine[],
      lineId: string,
      position: number,
    ) => {
      return lines.map((line) =>
        line.id === lineId ? { ...line, position: Math.round(position) } : line,
      );
    },
    [],
  );

  // 공통 함수: 이벤트에서 선 위치 업데이트
  const updateLinePositionFromEvent = useCallback(
    (clientX: number, clientY: number, lineType: LineType) => {
      if (!imageContainerRef.current || !imageInfo || !draggingLineId) return;

      const rect = imageContainerRef.current.getBoundingClientRect();
      const imageRect = calculateImageRect(
        rect,
        imageInfo.width,
        imageInfo.height,
      );

      if (lineType === "vertical") {
        const pixelPosition = convertToImagePixel(
          clientX,
          imageRect,
          imageInfo.width,
        );
        setVerticalLines((prev) =>
          updateLinePosition(prev, draggingLineId, pixelPosition),
        );
      } else if (lineType === "horizontal") {
        const pixelPosition = convertToImagePixel(
          clientY,
          { left: imageRect.top, width: imageRect.height },
          imageInfo.height,
        );
        setHorizontalLines((prev) =>
          updateLinePosition(prev, draggingLineId, pixelPosition),
        );
      }
    },
    [draggingLineId, imageInfo, updateLinePosition],
  );

  const handleLineMouseDown = (
    e: React.MouseEvent,
    lineId: string,
    lineType: LineType,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!imageContainerRef.current || !imageInfo) return;

    setDraggingLineId(lineId);
    setDraggingLineType(lineType);
    setIsDragging(true);
  };

  const handleLineTouchStart = (
    e: React.TouchEvent,
    lineId: string,
    lineType: LineType,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!imageContainerRef.current || !imageInfo) return;

    setDraggingLineId(lineId);
    setDraggingLineType(lineType);
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (
        !isDragging ||
        !draggingLineId ||
        !draggingLineType ||
        !imageContainerRef.current ||
        !imageInfo
      )
        return;

      updateLinePositionFromEvent(e.clientX, e.clientY, draggingLineType);
    },
    [
      isDragging,
      draggingLineId,
      draggingLineType,
      imageInfo,
      updateLinePositionFromEvent,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDraggingLineId(null);
    setDraggingLineType(null);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (
        !isDragging ||
        !draggingLineId ||
        !draggingLineType ||
        !imageContainerRef.current ||
        !imageInfo
      )
        return;

      const touch = e.touches[0];
      updateLinePositionFromEvent(
        touch.clientX,
        touch.clientY,
        draggingLineType,
      );
    },
    [
      isDragging,
      draggingLineId,
      draggingLineType,
      imageInfo,
      updateLinePositionFromEvent,
    ],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setDraggingLineId(null);
    setDraggingLineType(null);
  }, []);

  return {
    // 상태
    imageInfo,
    verticalLines,
    horizontalLines,
    isDragging,
    fileInputRef,
    imageContainerRef,

    // 액션
    handleImageChange,
    addVerticalLine,
    addHorizontalLine,
    removeVerticalLine,
    removeHorizontalLine,
    clearAllLines,
    handleLineMouseDown,
    handleLineTouchStart,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  };
};
