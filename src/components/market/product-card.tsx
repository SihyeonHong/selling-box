import NoImage from "@/components/common/no-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/common/shadcn/card";

export default function ProductCard() {
  return (
    <Card className="min-h-36 py-1">
      <CardContent className="flex h-full w-full flex-col items-center justify-between gap-2 px-1">
        <div className="flex w-full flex-1 items-center justify-center">
          <NoImage rounded="md" />
        </div>
        <div className="w-full text-center">
          <CardTitle className="truncate">상품 이름</CardTitle>
          <CardDescription className="">10,000 원</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
