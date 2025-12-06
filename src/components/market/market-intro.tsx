import Image from "next/image";

import NoImage from "@/components/common/no-image";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/common/shadcn/card";
import { Market } from "@/types/market";

interface MarketIntroProps {
  market: Market;
}

export default function MarketIntro({ market }: MarketIntroProps) {
  return (
    <Card className="w-full max-w-6xl gap-0">
      <CardContent className="flex items-center gap-4">
        {market.profileImg ? (
          <Image
            src={market.profileImg}
            alt={market.marketName}
            width={300}
            height={300}
          />
        ) : (
          <NoImage size="md" />
        )}
        <div className="flex-1">
          <CardTitle className="mb-2 text-xl">{market.marketName}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {market.description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
