import Image from "next/image";

import NoImage from "@/components/common/no-image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/common/shadcn/item";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR") + " 원";
  };

  return (
    <Item
      variant="outline"
      className="w-full flex-col items-center gap-0 border-2 p-0"
    >
      <ItemHeader className="w-full p-0">
        <div className="aspect-square w-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="h-full w-full rounded-t-md object-cover"
            />
          ) : (
            <NoImage
              size="custom"
              className="h-full w-full rounded-t-md"
              rounded="none"
            />
          )}
        </div>
      </ItemHeader>

      <ItemContent className="w-full p-2">
        <ItemTitle className="line-clamp-2 w-full text-center leading-tight">
          {product.name}
        </ItemTitle>
        <ItemDescription className="text-center">
          {product.prize ? formatPrice(product.prize) : "가격 미정"}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
