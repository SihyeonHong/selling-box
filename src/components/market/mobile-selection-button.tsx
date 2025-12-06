import { Check } from "lucide-react";

import { Button } from "@/components/common/shadcn/button";

interface MobileSelectionButtonProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  selectedCount: number;
}

export default function MobileSelectionButton({
  isEditMode,
  onToggleEditMode,
  selectedCount,
}: MobileSelectionButtonProps) {
  // 편집모드일 때는 렌더링하지 않음
  if (isEditMode) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 lg:hidden">
      <Button
        onClick={onToggleEditMode}
        variant="outline"
        className="bg-background/95 border-border hover:bg-background/100 dark:bg-primary dark:text-primary-foreground dark:border-primary dark:hover:bg-primary/90 shadow-xl backdrop-blur-sm"
        size="lg"
      >
        <Check className="mr-2 h-4 w-4" />
        {selectedCount > 0 ? `선택된 상품 ${selectedCount}개` : "상품 선택"}
      </Button>
    </div>
  );
}
