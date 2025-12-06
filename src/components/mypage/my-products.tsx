"use client";

import ProductCardContainer from "@/components/common/products/product-card-container";
import ProductPanelMobile from "@/components/mypage/product-panel-mobile";
import { useProductSelection } from "@/hooks/useProductSelection";
import { Product } from "@/types/product";

interface MyProductsProps {
  userId: string;
  products: Product[];
}

export default function MyProducts({ userId, products }: MyProductsProps) {
  const {
    isEditMode,
    selectedProductIds,
    onProductSelectionChange,
    onToggleEditMode,
  } = useProductSelection();

  return (
    <div className="w-full max-w-6xl space-y-8 px-8">
      <h1 className="text-2xl font-bold">내 상품 관리</h1>
      <ProductPanelMobile
        isEditMode={isEditMode}
        onToggleEditMode={onToggleEditMode}
      />
      <ProductCardContainer
        products={products}
        isLoggedIn
        userId={userId}
        isEditMode={isEditMode}
        selectedProductIds={selectedProductIds}
        onProductSelectionChange={onProductSelectionChange}
      />
    </div>
  );
}
