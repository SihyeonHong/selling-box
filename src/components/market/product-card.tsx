import Image from "next/image";

import NoImage from "@/components/common/no-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR") + " 원";
  };

  return (
    <Card className="w-full border-2 p-0">
      <CardContent className="flex flex-col items-center gap-2 p-0">
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

        {/* 텍스트 영역 */}
        <div className="w-full text-center">
          <CardTitle className="truncate leading-tight">
            {product.name}
          </CardTitle>
          <CardDescription className="">
            {product.prize ? formatPrice(product.prize) : "가격 미정"}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
