import React from "react";

import { Input } from "@/components/common/shadcn/input";

interface ControlPanelProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddVerticalLine: () => void;
  onAddHorizontalLine: () => void;
  onClearAllLines: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  fileInputRef,
  onImageChange,
  onAddVerticalLine,
  onAddHorizontalLine,
  onClearAllLines,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-foreground text-sm font-medium">
          이미지 파일 선택
        </label>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <button
            onClick={onAddVerticalLine}
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          >
            수직선 추가
          </button>
          <button
            onClick={onAddHorizontalLine}
            className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
          >
            수평선 추가
          </button>
          <button
            onClick={onClearAllLines}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
            모든 선 제거
          </button>
        </div>
      </div>
    </div>
  );
};
