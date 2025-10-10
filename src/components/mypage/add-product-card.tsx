import Link from "next/link";

import {
  Item,
  ItemContent,
  ItemHeader,
  ItemTitle,
} from "@/components/common/shadcn/item";

export default function AddProductCard({ userId }: { userId: string }) {
  return (
    <Link href={`/${userId}/mypage/new-product`} className="block">
      <Item
        variant="outline"
        className="hover:border-primary hover:bg-muted/50 w-full flex-col items-center gap-0 border-2 border-dashed p-0 transition-colors"
      >
        <ItemHeader className="w-full p-2">
          <div className="flex aspect-square w-full items-center justify-center">
            <div className="border-muted-foreground/50 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed">
              <span className="text-muted-foreground/70 text-3xl font-light">
                +
              </span>
            </div>
          </div>
        </ItemHeader>

        <ItemContent className="w-full p-2">
          <div className="h-12 w-full">
            <ItemTitle className="text-muted-foreground line-clamp-2 w-full text-center leading-tight">
              상품 추가
            </ItemTitle>
          </div>
        </ItemContent>
      </Item>
    </Link>
  );
}
