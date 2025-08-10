import LoadingPage from "@/components/common/loading/loading-page";
import GalleryForProducts from "@/components/market/gallery-for-products";
import MarketIntro from "@/components/market/market-intro";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { userId } = await params;

  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <MarketIntro userId={userId} />
      <GalleryForProducts />
    </div>
  );
}
