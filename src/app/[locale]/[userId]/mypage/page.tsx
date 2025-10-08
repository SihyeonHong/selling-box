import ImageContainer from "@/components/mypage/image-container";
import MarketInfo from "@/components/mypage/market-info";
import ProductRegistration from "@/components/mypage/product-registration";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
  }>;
}

export default async function MyPage({ params }: Props) {
  const { userId } = await params;

  return (
    <>
      <div className="container mx-auto flex flex-col gap-8">
        <MarketInfo userId={userId} />

        <ProductRegistration />

        <ImageContainer />
      </div>
    </>
  );
}
