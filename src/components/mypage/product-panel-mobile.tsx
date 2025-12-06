import { Check } from "lucide-react";

import { Button } from "@/components/common/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";

interface ProductPanelMobileProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export default function ProductPanelMobile({
  isEditMode,
  onToggleEditMode,
}: ProductPanelMobileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">상품 관리</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          variant={isEditMode ? "default" : "outline"}
          size="sm"
          onClick={onToggleEditMode}
        >
          <Check className="h-4 w-4" />
          {isEditMode ? "편집 완료" : "상품 선택"}
        </Button>
      </CardContent>
    </Card>
  );
}
