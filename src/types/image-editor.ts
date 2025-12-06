export type LineType = "vertical" | "horizontal";

export interface VerticalLine {
  id: string;
  position: number; // 왼쪽에서부터 몇 픽셀
}

export interface HorizontalLine {
  id: string;
  position: number; // 위에서부터 몇 픽셀
}

export interface ImageInfo {
  width: number;
  height: number;
  url: string;
  fileName: string;
}

export interface ImageEditorState {
  imageInfo: ImageInfo | null;
  verticalLines: VerticalLine[];
  horizontalLines: HorizontalLine[];
  isDragging: boolean;
  draggingLineId: string | null;
  draggingLineType: LineType | null;
}
