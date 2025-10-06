import Image from "next/image";

import NoImage from "@/components/common/no-image";
import { Checkbox } from "@/components/common/shadcn/checkbox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/common/shadcn/item";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format-price";

interface ProductCardProps {
  product: Product;
  isEditMode?: boolean;
  isSelected?: boolean;
  onSelectionChange?: (productId: string, isSelected: boolean) => void;
}

export default function ProductCard({
  product,
  isEditMode = false,
  isSelected = false,
  onSelectionChange,
}: ProductCardProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onSelectionChange?.(product.id, checked);
  };

  return (
    <div className="relative">
      <Item
        variant="outline"
        className="w-full flex-col items-center gap-0 border-2 p-0"
      >
        <ItemHeader className="w-full p-2">
          <div className="aspect-square w-full">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <NoImage
                size="custom"
                className="h-full w-full rounded-md"
                rounded="none"
              />
            )}
          </div>
        </ItemHeader>

        <ItemContent className="w-full p-2">
          <div className="h-12 w-full">
            <ItemTitle className="line-clamp-2 w-full text-center leading-tight">
              {product.name}
            </ItemTitle>
          </div>
          <ItemDescription className="text-center">
            {product.prize ? formatPrice(product.prize) : "가격 미정"}
          </ItemDescription>
        </ItemContent>
      </Item>

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
