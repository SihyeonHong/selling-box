import ProductCardWrapper from "@/components/market/product-card-wrapper";
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
        <ProductCardWrapper
          key={product.id}
          product={product}
          isEditMode={isEditMode}
          isSelected={selectedProductIds.has(product.id)}
          onSelectionChange={onProductSelectionChange}
        />
      ))}
    </div>
  );
}
