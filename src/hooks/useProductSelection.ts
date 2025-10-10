"use client";

import { useState } from "react";

export function useProductSelection() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(
    new Set(),
  );

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
  const handleToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) {
      // 편집모드 종료 시 선택 해제
      setSelectedProductIds(new Set());
    }
  };

  return {
    isEditMode,
    selectedProductIds,
    onProductSelectionChange: handleProductSelectionChange,
    onRemoveProduct: handleRemoveProduct,
    onClearAll: handleClearAll,
    onToggleEditMode: handleToggleEditMode,
  };
}
