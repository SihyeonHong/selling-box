import { VerticalLine, HorizontalLine } from "@/types/image-editor";

/**
 * 픽셀 위치를 퍼센티지로 변환
 */
export const pixelToPercentage = (pixel: number, total: number): number => {
  return (pixel / total) * 100;
};

/**
 * 퍼센티지를 픽셀 위치로 변환
 */
export const percentageToPixel = (
  percentage: number,
  total: number,
): number => {
  return (percentage / 100) * total;
};

/**
 * 마우스/터치 좌표를 이미지 픽셀 좌표로 변환
 */
export const convertToImagePixel = (
  clientPosition: number,
  imageRect: { left: number; width: number },
  imageSize: number,
): number => {
  const relativePosition = clientPosition - imageRect.left;
  const percentage = relativePosition / imageRect.width;
  return Math.max(0, Math.min(imageSize, percentage * imageSize));
};

/**
 * 이미지 컨테이너의 실제 이미지 영역 계산
 * object-contain으로 표시된 이미지의 실제 렌더링 영역을 계산
 */
export const calculateImageRect = (
  containerRect: DOMRect,
  imageWidth: number,
  imageHeight: number,
) => {
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  // object-contain 비율 계산
  const widthRatio = containerWidth / imageWidth;
  const heightRatio = containerHeight / imageHeight;
  const scale = Math.min(widthRatio, heightRatio);

  // 실제 이미지 렌더링 크기
  const actualImageWidth = imageWidth * scale;
  const actualImageHeight = imageHeight * scale;

  // 중앙 정렬을 위한 오프셋 계산
  const offsetX = (containerWidth - actualImageWidth) / 2;
  const offsetY = (containerHeight - actualImageHeight) / 2;

  return {
    left: containerRect.left + offsetX,
    right: containerRect.left + offsetX + actualImageWidth,
    width: actualImageWidth,
    top: containerRect.top + offsetY,
    bottom: containerRect.top + offsetY + actualImageHeight,
    height: actualImageHeight,
  };
};

/**
 * 수직선들을 위치순으로 정렬
 */
export const sortVerticalLines = (lines: VerticalLine[]): VerticalLine[] => {
  return [...lines].sort((a, b) => a.position - b.position);
};

/**
 * 수평선들을 위치순으로 정렬
 */
export const sortHorizontalLines = (
  lines: HorizontalLine[],
): HorizontalLine[] => {
  return [...lines].sort((a, b) => a.position - b.position);
};

/**
 * 총 조각 개수 계산
 */
export const calculateTotalPieces = (
  verticalLines: VerticalLine[],
  horizontalLines: HorizontalLine[],
): number => {
  return (verticalLines.length + 1) * (horizontalLines.length + 1);
};

/**
 * 새로운 수직선 생성
 */
export const createVerticalLine = (imageWidth: number): VerticalLine => ({
  id: `vertical-${Date.now()}`,
  position: Math.floor(imageWidth / 2),
});

/**
 * 새로운 수평선 생성
 */
export const createHorizontalLine = (imageHeight: number): HorizontalLine => ({
  id: `horizontal-${Date.now()}`,
  position: Math.floor(imageHeight / 2),
});
