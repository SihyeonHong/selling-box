"use client";

import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";

import { Input } from "@/components/common/shadcn/input";
import { ImageInfo } from "@/types/image";

interface VerticalLine {
  id: string;
  position: number; // 픽셀 단위 위치
}

interface HorizontalLine {
  id: string;
  position: number; // 픽셀 단위 위치
}

export default function ImageContainer() {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [verticalLines, setVerticalLines] = useState<VerticalLine[]>([]);
  const [horizontalLines, setHorizontalLines] = useState<HorizontalLine[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingLineId, setDraggingLineId] = useState<string | null>(null);
  const [draggingLineType, setDraggingLineType] = useState<
    "vertical" | "horizontal" | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

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

  const addVerticalLine = () => {
    if (!imageInfo) return;

    const newLine: VerticalLine = {
      id: `vertical-${Date.now()}`,
      position: Math.floor(imageInfo.width / 2), // 이미지 중앙에 추가
    };

    setVerticalLines([...verticalLines, newLine]);
  };

  const addHorizontalLine = () => {
    if (!imageInfo) return;

    const newLine: HorizontalLine = {
      id: `horizontal-${Date.now()}`,
      position: Math.floor(imageInfo.height / 2), // 이미지 중앙에 추가
    };

    setHorizontalLines([...horizontalLines, newLine]);
  };

  const removeVerticalLine = (lineId: string) => {
    setVerticalLines(verticalLines.filter((line) => line.id !== lineId));
  };

  const removeHorizontalLine = (lineId: string) => {
    setHorizontalLines(horizontalLines.filter((line) => line.id !== lineId));
  };

  const handleLineMouseDown = (
    e: React.MouseEvent,
    lineId: string,
    lineType: "vertical" | "horizontal",
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
    lineType: "vertical" | "horizontal",
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

      const rect = imageContainerRef.current.getBoundingClientRect();
      const imageRect = {
        left: rect.left + 8,
        right: rect.right - 8,
        width: rect.width - 16,
        top: rect.top + 8,
        bottom: rect.bottom - 8,
        height: rect.height - 16,
      };

      if (draggingLineType === "vertical") {
        const mouseX = e.clientX - imageRect.left;
        const pixelPosition = Math.max(
          0,
          Math.min(
            imageInfo.width,
            (mouseX / imageRect.width) * imageInfo.width,
          ),
        );

        setVerticalLines((prev) =>
          prev.map((line) =>
            line.id === draggingLineId
              ? { ...line, position: Math.round(pixelPosition) }
              : line,
          ),
        );
      } else if (draggingLineType === "horizontal") {
        const mouseY = e.clientY - imageRect.top;
        const pixelPosition = Math.max(
          0,
          Math.min(
            imageInfo.height,
            (mouseY / imageRect.height) * imageInfo.height,
          ),
        );

        setHorizontalLines((prev) =>
          prev.map((line) =>
            line.id === draggingLineId
              ? { ...line, position: Math.round(pixelPosition) }
              : line,
          ),
        );
      }
    },
    [isDragging, draggingLineId, draggingLineType, imageInfo],
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

      const rect = imageContainerRef.current.getBoundingClientRect();
      const imageRect = {
        left: rect.left + 8,
        right: rect.right - 8,
        width: rect.width - 16,
        top: rect.top + 8,
        bottom: rect.bottom - 8,
        height: rect.height - 16,
      };

      const touch = e.touches[0];

      if (draggingLineType === "vertical") {
        const touchX = touch.clientX - imageRect.left;
        const pixelPosition = Math.max(
          0,
          Math.min(
            imageInfo.width,
            (touchX / imageRect.width) * imageInfo.width,
          ),
        );

        setVerticalLines((prev) =>
          prev.map((line) =>
            line.id === draggingLineId
              ? { ...line, position: Math.round(pixelPosition) }
              : line,
          ),
        );
      } else if (draggingLineType === "horizontal") {
        const touchY = touch.clientY - imageRect.top;
        const pixelPosition = Math.max(
          0,
          Math.min(
            imageInfo.height,
            (touchY / imageRect.height) * imageInfo.height,
          ),
        );

        setHorizontalLines((prev) =>
          prev.map((line) =>
            line.id === draggingLineId
              ? { ...line, position: Math.round(pixelPosition) }
              : line,
          ),
        );
      }
    },
    [isDragging, draggingLineId, draggingLineType, imageInfo],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setDraggingLineId(null);
    setDraggingLineType(null);
  }, []);

  // 마우스 및 터치 이벤트 리스너 등록
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div className="mx-auto w-full flex-1 space-y-4 p-4">
      <h1>Image Container</h1>
      <div className="space-y-2">
        <label className="text-foreground text-sm font-medium">
          이미지 파일 선택
        </label>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {imageInfo && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                onClick={addVerticalLine}
                className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
              >
                수직선 추가
              </button>
              <button
                onClick={addHorizontalLine}
                className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
              >
                수평선 추가
              </button>
              <button
                onClick={() => {
                  setVerticalLines([]);
                  setHorizontalLines([]);
                }}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                모든 선 제거
              </button>
            </div>
          </div>

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
                className="relative flex-1 overflow-visible border pt-8 pb-8"
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

                {/* 수직선들 */}
                {verticalLines.map((line) => {
                  const percentage = (line.position / imageInfo.width) * 100;
                  return (
                    <div
                      key={line.id}
                      className="absolute top-0 bottom-0 z-10 w-0.5 cursor-ew-resize bg-red-500"
                      style={{ left: `${percentage}%` }}
                      onMouseDown={(e) =>
                        handleLineMouseDown(e, line.id, "vertical")
                      }
                      onTouchStart={(e) =>
                        handleLineTouchStart(e, line.id, "vertical")
                      }
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
                          removeVerticalLine(line.id);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}

                {/* 수평선들 */}
                {horizontalLines.map((line) => {
                  const percentage = (line.position / imageInfo.height) * 100;
                  return (
                    <div
                      key={line.id}
                      className="absolute right-0 left-0 z-10 h-0.5 cursor-ns-resize bg-green-500"
                      style={{ top: `${percentage}%` }}
                      onMouseDown={(e) =>
                        handleLineMouseDown(e, line.id, "horizontal")
                      }
                      onTouchStart={(e) =>
                        handleLineTouchStart(e, line.id, "horizontal")
                      }
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
                          removeHorizontalLine(line.id);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
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
                크기: {imageInfo.width} × {imageInfo.height}px
              </p>
              <p className="text-muted-foreground text-sm">
                수직선: {verticalLines.length}개, 수평선:{" "}
                {horizontalLines.length}개
              </p>
              {(verticalLines.length > 0 || horizontalLines.length > 0) && (
                <div className="mt-2">
                  {verticalLines.length > 0 && (
                    <div className="mb-2">
                      <p className="text-muted-foreground mb-1 text-sm font-medium">
                        수직 절취선 위치 (왼쪽부터):
                      </p>
                      <div className="space-y-1">
                        {verticalLines
                          .sort((a, b) => a.position - b.position)
                          .map((line, index) => (
                            <p
                              key={line.id}
                              className="text-muted-foreground text-xs"
                            >
                              수직선 {index + 1}: {line.position}px (
                              {Math.round(
                                (line.position / imageInfo.width) * 100,
                              )}
                              %)
                            </p>
                          ))}
                      </div>
                    </div>
                  )}

                  {horizontalLines.length > 0 && (
                    <div className="mb-2">
                      <p className="text-muted-foreground mb-1 text-sm font-medium">
                        수평 절취선 위치 (위쪽부터):
                      </p>
                      <div className="space-y-1">
                        {horizontalLines
                          .sort((a, b) => a.position - b.position)
                          .map((line, index) => (
                            <p
                              key={line.id}
                              className="text-muted-foreground text-xs"
                            >
                              수평선 {index + 1}: {line.position}px (
                              {Math.round(
                                (line.position / imageInfo.height) * 100,
                              )}
                              %)
                            </p>
                          ))}
                      </div>
                    </div>
                  )}

                  <p className="text-muted-foreground mt-2 text-xs">
                    → 총{" "}
                    {(verticalLines.length + 1) * (horizontalLines.length + 1)}
                    개 조각으로 분할됩니다
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
