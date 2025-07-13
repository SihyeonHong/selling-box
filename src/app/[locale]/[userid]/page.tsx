import GalleryForProducts from "@/components/gallery-for-products";
import MarketIntro from "@/components/market-intro";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
  }>;
}

export default async function Page({ params }: Props) {
  // 지금은 아직 비동기 아닌데 Next.js가 비동기로 바꿀거라고 함
  const { userId } = await params; // 서버 에러 무시 어차피 200

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <MarketIntro userId={userId} />
      <GalleryForProducts />
    </div>
  );
}
