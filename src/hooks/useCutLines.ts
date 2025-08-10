"use client";

import { useState } from "react";

import { CutLineType } from "@/types/market";

export default function useCutLines() {
  const [cutLines, setCutLines] = useState<CutLineType[]>([]);

  const addVerticalLine = () => {
    const verticalLines = cutLines.filter((line) => line.type === "vertical");
    const segments = verticalLines.length + 1;
    const newPosition = (100 / (segments + 1)) * (verticalLines.length + 1);

    const newLine: CutLineType = {
      id: `vertical-${Date.now()}`,
      type: "vertical",
      position: newPosition,
    };

    setCutLines([...cutLines, newLine]);
  };

  const addHorizontalLine = () => {
    const horizontalLines = cutLines.filter(
      (line) => line.type === "horizontal",
    );
    const segments = horizontalLines.length + 1;
    const newPosition = (100 / (segments + 1)) * (horizontalLines.length + 1);

    const newLine: CutLineType = {
      id: `horizontal-${Date.now()}`,
      type: "horizontal",
      position: newPosition,
    };

    setCutLines([...cutLines, newLine]);
  };

  const removeLine = (lineId: string) => {
    setCutLines(cutLines.filter((line) => line.id !== lineId));
  };

  const clearAllLines = () => {
    setCutLines([]);
  };

  const getStats = () => {
    const verticalCount = cutLines.filter((l) => l.type === "vertical").length;
    const horizontalCount = cutLines.filter(
      (l) => l.type === "horizontal",
    ).length;
    const totalImages = (verticalCount + 1) * (horizontalCount + 1);

    return {
      verticalCount,
      horizontalCount,
      totalImages,
    };
  };

  return {
    cutLines,
    setCutLines,
    addVerticalLine,
    addHorizontalLine,
    removeLine,
    clearAllLines,
    getStats,
  };
}
