import NoImage from "@/components/common/no-image";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/common/shadcn/card";

interface MarketIntroProps {
  userId: string;
}

export default function MarketIntro({ userId }: MarketIntroProps) {
  console.log("MarketIntro userId:", userId);

  return (
    <Card className="w-full gap-0">
      <CardContent className="flex items-center gap-4">
        <NoImage size="md" />
        <div className="flex-1">
          <CardTitle className="mb-2 text-xl">{userId}의 마켓</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            프사에 있는 QR 옾챗이나 트위터 디엠 주세요
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
