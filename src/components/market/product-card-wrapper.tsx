import { Checkbox } from "@/components/common/shadcn/checkbox";
import { Product } from "@/types/product";

import ProductCard from "./product-card";

interface ProductCardWrapperProps {
  product: Product;
  isEditMode: boolean;
  isSelected: boolean;
  onSelectionChange: (productId: string, isSelected: boolean) => void;
}

export default function ProductCardWrapper({
  product,
  isEditMode,
  isSelected,
  onSelectionChange,
}: ProductCardWrapperProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onSelectionChange(product.id, checked);
  };

  return (
    <div className="relative">
      <ProductCard product={product} />

      {isEditMode && (
        <div className="absolute top-2 left-2 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
            className="h-5 w-5 border-2 bg-white/90 shadow-md"
          />
        </div>
      )}
    </div>
  );
}
