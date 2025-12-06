"use client";

import ProductCardContainer from "@/components/common/products/product-card-container";
import MobileSelectionButton from "@/components/market/mobile-selection-button";
import SelectionPanelBottom from "@/components/market/selection-panel-bottom";
import SelectionPanelRight from "@/components/market/selection-panel-right";
import { useProductSelection } from "@/hooks/useProductSelection";
import { Product } from "@/types/product";

interface MarketContentProps {
  products: Product[];
}

export default function MarketContent({ products }: MarketContentProps) {
  const {
    isEditMode,
    selectedProductIds,
    onProductSelectionChange,
    onRemoveProduct,
    onClearAll,
    onToggleEditMode,
  } = useProductSelection();

  return (
    <>
      {/* 메인 컨테이너 - 반응형 레이아웃 */}
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* 갤러리 영역 */}
          <ProductCardContainer
            products={products}
            isEditMode={isEditMode}
            selectedProductIds={selectedProductIds}
            onProductSelectionChange={onProductSelectionChange}
          />

          {/* 데스크톱용 오른쪽 패널 */}
          <div className="hidden lg:block">
            <SelectionPanelRight
              products={products}
              isEditMode={isEditMode}
              onToggleEditMode={onToggleEditMode}
              selectedProductIds={selectedProductIds}
              onRemoveProduct={onRemoveProduct}
              onClearAll={onClearAll}
            />
          </div>
        </div>
      </div>

      {/* 모바일용 상품 선택 버튼 (편집모드가 아닐 때) */}
      <MobileSelectionButton
        isEditMode={isEditMode}
        onToggleEditMode={onToggleEditMode}
        selectedCount={selectedProductIds.size}
      />

      {/* 모바일용 하단 패널 (편집모드일 때) */}
      <SelectionPanelBottom
        products={products}
        isEditMode={isEditMode}
        onToggleEditMode={onToggleEditMode}
        selectedProductIds={selectedProductIds}
        onRemoveProduct={onRemoveProduct}
        onClearAll={onClearAll}
      />
    </>
  );
}
