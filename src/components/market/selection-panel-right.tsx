import { Check } from "lucide-react";

import { Badge } from "@/components/common/shadcn/badge";
import { Button } from "@/components/common/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Separator } from "@/components/common/shadcn/separator";
import { useSelectionControl } from "@/hooks/useSelectionControl";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format-price";

interface SelectionPanelRightProps {
  products: Product[];
  isEditMode: boolean;
  onToggleEditMode: () => void;
  selectedProductIds: Set<string>;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

export default function SelectionPanelRight({
  products,
  isEditMode,
  onToggleEditMode,
  selectedProductIds,
  onRemoveProduct,
  onClearAll,
}: SelectionPanelRightProps) {
  const { selectedProducts, totalPrice } = useSelectionControl({
    products,
    selectedProductIds,
  });

  if (selectedProducts.length === 0) {
    return (
      <Card className="sticky top-4 h-fit w-80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">선택된 상품</CardTitle>
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              onClick={onToggleEditMode}
            >
              <Check className="h-4 w-4" />
              {isEditMode ? "편집 완료" : "상품 선택"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground py-8 text-center">
            상품을 선택해주세요
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4 h-fit w-80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">선택된 상품</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selectedProducts.length}개</Badge>
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              onClick={onToggleEditMode}
            >
              {isEditMode ? "편집 완료" : "상품 선택"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* 선택된 상품 목록 */}
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {selectedProducts.map((product) => (
            <div
              key={product.productId}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-muted-foreground text-xs">
                  {product.prize ? formatPrice(product.prize) : "가격 미정"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveProduct(product.productId)}
                className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        <Separator />

        {/* 총 가격 및 액션 버튼 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">총 가격</span>
            <span className="text-primary text-lg font-bold">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <div className="space-y-2">
            <Button className="w-full" size="lg">
              구매하기
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="w-full"
            >
              전체 삭제
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
