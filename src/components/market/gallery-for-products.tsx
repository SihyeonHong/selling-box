import ProductCard from "@/components/market/product-card";
import { Product } from "@/types/product";

interface GalleryForProductsProps {
  products: Product[];
  isEditMode: boolean;
  selectedProductIds: Set<string>;
  onProductSelectionChange: (productId: string, isSelected: boolean) => void;
}

export default function GalleryForProducts({
  products,
  isEditMode,
  selectedProductIds,
  onProductSelectionChange,
}: GalleryForProductsProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isEditMode={isEditMode}
          isSelected={selectedProductIds.has(product.id)}
          onSelectionChange={onProductSelectionChange}
        />
      ))}
      {/* 12번째 카드로 긴 상품명 테스트 */}
      <ProductCard
        key={longNameProduct.id}
        product={longNameProduct}
        isEditMode={isEditMode}
        isSelected={selectedProductIds.has(longNameProduct.id)}
        onSelectionChange={onProductSelectionChange}
      />
    </div>
  );
}

// 하드코딩된 긴 상품명 테스트용 Product
const longNameProduct: Product = {
  id: "test-long-name-product",
  name: "이것은 매우 긴 상품명을 테스트하기 위한 특별히 제작된 상품입니다. 정말로 긴 상품명이 어떻게 표시되는지 확인해보겠습니다.",
  prize: 999999,
  image: `https://picsum.photos/300/300`,
  description: "긴 상품명 테스트용 상품입니다.",
};
