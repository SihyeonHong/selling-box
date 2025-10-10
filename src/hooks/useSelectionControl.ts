import { Product } from "@/types/product";

interface UseProductSelectionProps {
  products: Product[];
  selectedProductIds: Set<string>;
}

export function useSelectionControl({
  products,
  selectedProductIds,
}: UseProductSelectionProps) {
  // 선택된 상품들 계산
  const selectedProducts = products.filter((product) =>
    selectedProductIds.has(product.productId),
  );

  // 총 가격 계산
  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + (product.prize || 0),
    0,
  );

  return {
    selectedProducts,
    totalPrice,
  };
}
