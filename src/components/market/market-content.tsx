"use client";

import { useState, useMemo } from "react";

import { Button } from "@/components/common/shadcn/button";
import ProductCardContainer from "@/components/market/product-card-container";
import SelectionPanelBottom from "@/components/market/selection-panel-bottom";
import SelectionPanelRight from "@/components/market/selection-panel-right";
import { Product } from "@/types/product";

interface MarketContentProps {
  products: Product[];
}

export default function MarketContent({ products }: MarketContentProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(
    new Set(),
  );

  // 선택된 상품들 계산
  const selectedProducts = useMemo(() => {
    return products.filter((product) =>
      selectedProductIds.has(product.productId),
    );
  }, [selectedProductIds, products]);

  // 총 가격 계산
  const totalPrice = useMemo(() => {
    return selectedProducts.reduce(
      (sum, product) => sum + (product.prize || 0),
      0,
    );
  }, [selectedProducts]);

  // 상품 선택/해제 핸들러
  const handleProductSelectionChange = (
    productId: string,
    isSelected: boolean,
  ) => {
    setSelectedProductIds((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  // 개별 상품 제거
  const handleRemoveProduct = (productId: string) => {
    setSelectedProductIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  // 전체 선택 해제
  const handleClearAll = () => {
    setSelectedProductIds(new Set());
  };

  // 편집모드 토글
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) {
      // 편집모드 종료 시 선택 해제
      setSelectedProductIds(new Set());
    }
  };

  return (
    <>
      {/* 편집모드 토글 버튼 */}
      <div className="w-full max-w-6xl">
        <Button
          variant={isEditMode ? "default" : "outline"}
          onClick={toggleEditMode}
          className="mb-4"
        >
          {isEditMode ? "편집 완료" : "상품 선택"}
        </Button>
      </div>

      {/* 메인 컨테이너 - 반응형 레이아웃 */}
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* 갤러리 영역 */}
          <ProductCardContainer
            products={products}
            isEditMode={isEditMode}
            selectedProductIds={selectedProductIds}
            onProductSelectionChange={handleProductSelectionChange}
          />

          {/* 데스크톱용 오른쪽 패널 */}
          <div className="hidden md:block">
            <SelectionPanelRight
              selectedProducts={selectedProducts}
              totalPrice={totalPrice}
              onRemoveProduct={handleRemoveProduct}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </div>

      {/* 모바일용 하단 패널 */}
      <SelectionPanelBottom
        selectedProducts={selectedProducts}
        totalPrice={totalPrice}
        onRemoveProduct={handleRemoveProduct}
        onClearAll={handleClearAll}
      />
    </>
  );
}
