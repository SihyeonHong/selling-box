import MarketContent from "@/components/market/market-content";
import MarketIntro from "@/components/market/market-intro";
import { createDefaultMockProducts } from "@/mocks/product-mock";
import { Market } from "@/types/market";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { userId } = await params;

  // 서버사이드에서 상품 데이터 가져오기
  const market: Market = {
    userId: userId,
    marketName: userId + "의 마켓",
    description: "프사에 있는 QR 옾챗이나 트위터 디엠 주세요",
    profileImg: null,
  };
  const allProducts = createDefaultMockProducts();

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 sm:p-8 md:p-16">
      <MarketIntro market={market} />
      <MarketContent products={allProducts} />
    </div>
  );
}
