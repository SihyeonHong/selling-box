import { Separator } from "@/components/common/shadcn/separator";
import MyMarketInfo from "@/components/mypage/my-market-info";
import MyProducts from "@/components/mypage/my-products";
import { createMockProducts } from "@/mocks/product-mock";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
  }>;
}

export default async function MyPage({ params }: Props) {
  const { userId } = await params;
  const products = createMockProducts(3);

  return (
    <>
      <div className="container mx-auto flex flex-col gap-8">
        <MyMarketInfo userId={userId} />
        <Separator />
        <MyProducts userId={userId} products={products} />
        <Separator />
      </div>
    </>
  );
}
