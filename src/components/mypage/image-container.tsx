"use client";

import React, { useEffect } from "react";

import { ControlPanel } from "@/components/image-editor/ControlPanel";
import { ImageInfoComponent } from "@/components/image-editor/ImageInfo";
import { ImagePreview } from "@/components/image-editor/ImagePreview";
import { useImageEditor } from "@/hooks/useImageEditor";

export default function ImageContainer() {
  const {
    imageInfo,
    verticalLines,
    horizontalLines,
    isDragging,
    fileInputRef,
    imageContainerRef,
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
  } = useImageEditor();

  // 마우스 및 터치 이벤트 리스너 등록
  useEffect(() => {
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

      <ControlPanel
        fileInputRef={fileInputRef}
        onImageChange={handleImageChange}
        onAddVerticalLine={addVerticalLine}
        onAddHorizontalLine={addHorizontalLine}
        onClearAllLines={clearAllLines}
      />

      {imageInfo && (
        <div className="space-y-4">
          <ImagePreview
            imageInfo={imageInfo}
            imageContainerRef={imageContainerRef}
            verticalLines={verticalLines}
            horizontalLines={horizontalLines}
            onLineMouseDown={handleLineMouseDown}
            onLineTouchStart={handleLineTouchStart}
            onRemoveVerticalLine={removeVerticalLine}
            onRemoveHorizontalLine={removeHorizontalLine}
          />

          <ImageInfoComponent
            imageInfo={imageInfo}
            verticalLines={verticalLines}
            horizontalLines={horizontalLines}
          />
        </div>
      )}
    </div>
  );
}
