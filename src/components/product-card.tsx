import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import NoImage from "./no-image";

export default function ProductCard() {
  return (
    <Card className="h-36 py-1">
      <CardContent className="flex w-full flex-col items-start justify-between gap-2 px-1">
        <NoImage rounded="md" />
        <CardTitle>상품 이름</CardTitle>
        <CardDescription>10,000 원</CardDescription>
      </CardContent>
    </Card>
  );
}
