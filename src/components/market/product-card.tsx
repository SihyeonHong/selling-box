import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/common/shadcn/card";
import NoImage from "@/components/common/no-image";

export default function ProductCard() {
  return (
    <Card className="h-36 py-1">
      <CardContent className="flex w-full flex-col items-center justify-between gap-2 px-1">
        <NoImage rounded="md" />
        <CardTitle>상품 이름</CardTitle>
        <CardDescription>10,000 원</CardDescription>
      </CardContent>
    </Card>
  );
}
