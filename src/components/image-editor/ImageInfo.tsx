import React from "react";

import { ImageInfo, VerticalLine, HorizontalLine } from "@/types/image-editor";
import {
  sortVerticalLines,
  sortHorizontalLines,
  calculateTotalPieces,
  pixelToPercentage,
} from "@/utils/image-editor";

interface ImageInfoProps {
  imageInfo: ImageInfo;
  verticalLines: VerticalLine[];
  horizontalLines: HorizontalLine[];
}

export const ImageInfoComponent: React.FC<ImageInfoProps> = ({
  imageInfo,
  verticalLines,
  horizontalLines,
}) => {
  const sortedVerticalLines = sortVerticalLines(verticalLines);
  const sortedHorizontalLines = sortHorizontalLines(horizontalLines);
  const totalPieces = calculateTotalPieces(verticalLines, horizontalLines);

  return (
    <div className="bg-muted rounded-md p-3">
      <h3 className="text-foreground mb-2 text-sm font-medium">이미지 정보</h3>
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">
          파일명: {imageInfo.fileName}
        </p>
        <p className="text-muted-foreground text-sm">
          크기: {imageInfo.width} × {imageInfo.height}px
        </p>
        <p className="text-muted-foreground text-sm">
          수직선: {verticalLines.length}개, 수평선: {horizontalLines.length}개
        </p>
        {(verticalLines.length > 0 || horizontalLines.length > 0) && (
          <div className="mt-2">
            {verticalLines.length > 0 && (
              <div className="mb-2">
                <p className="text-muted-foreground mb-1 text-sm font-medium">
                  수직 절취선 위치 (왼쪽부터):
                </p>
                <div className="space-y-1">
                  {sortedVerticalLines.map((line, index) => (
                    <p key={line.id} className="text-muted-foreground text-xs">
                      수직선 {index + 1}: {line.position}px (
                      {Math.round(
                        pixelToPercentage(line.position, imageInfo.width),
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
                  {sortedHorizontalLines.map((line, index) => (
                    <p key={line.id} className="text-muted-foreground text-xs">
                      수평선 {index + 1}: {line.position}px (
                      {Math.round(
                        pixelToPercentage(line.position, imageInfo.height),
                      )}
                      %)
                    </p>
                  ))}
                </div>
              </div>
            )}

            <p className="text-muted-foreground mt-2 text-xs">
              → 총 {totalPieces}개 조각으로 분할됩니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
