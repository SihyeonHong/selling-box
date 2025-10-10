"use client";

import ProductCardContainer from "@/components/common/products/product-card-container";
import { useProductSelection } from "@/hooks/useProductSelection";
import { Product } from "@/types/product";

interface MyProductsProps {
  userId: string;
  products: Product[];
}

export default function MyProducts({ userId, products }: MyProductsProps) {
  const { isEditMode, selectedProductIds, onProductSelectionChange } =
    useProductSelection();

  return (
    <div className="w-full max-w-6xl px-8">
      <h1 className="mb-4 text-2xl font-bold">내 상품 관리</h1>

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
