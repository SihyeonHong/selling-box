import { Separator } from "@/components/common/shadcn/separator";
import MyMarketInfo from "@/components/mypage/my-market-info";
import MyProducts from "@/components/mypage/my-products";

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
        <MyMarketInfo userId={userId} />
        <Separator />
        <MyProducts userId={userId} />
        <Separator />
      </div>
    </>
  );
}
