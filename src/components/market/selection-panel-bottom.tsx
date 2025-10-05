import { Badge } from "@/components/common/shadcn/badge";
import { Button } from "@/components/common/shadcn/button";
import { Separator } from "@/components/common/shadcn/separator";
import { Product } from "@/types/product";

interface SelectionPanelBottomProps {
  selectedProducts: Product[];
  totalPrice: number;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

export default function SelectionPanelBottom({
  selectedProducts,
  totalPrice,
  onRemoveProduct,
  onClearAll,
}: SelectionPanelBottomProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR") + " 원";
  };

  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t shadow-lg md:hidden">
      <div className="space-y-3 p-4">
        {/* 선택된 상품 요약 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">선택된 상품</span>
            <Badge variant="secondary">{selectedProducts.length}개</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-destructive"
          >
            전체 삭제
          </Button>
        </div>

        {/* 선택된 상품 목록 (스크롤 가능) */}
        <div className="max-h-32 space-y-1 overflow-y-auto">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-muted flex items-center justify-between rounded-md p-2"
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
                onClick={() => onRemoveProduct(product.id)}
                className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        <Separator />

        {/* 총 가격 및 구매 버튼 */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">총 가격</p>
            <p className="text-primary text-lg font-bold">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <Button size="lg" className="px-8">
            구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}
