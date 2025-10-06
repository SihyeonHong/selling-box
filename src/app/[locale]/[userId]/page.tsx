import MarketContent from "@/components/market/market-content";
import MarketIntro from "@/components/market/market-intro";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { userId } = await params;

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 sm:p-8 md:p-16">
      <MarketIntro userId={userId} />
      <MarketContent userId={userId} />
    </div>
  );
}
