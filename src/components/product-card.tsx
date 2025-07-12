import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Image } from "lucide-react";

export default function ProductCard() {
  return (
    <Card className="h-40">
      <CardContent className="flex w-full flex-col items-start justify-between gap-1 px-1">
        <Image
          aria-label="default image icon"
          className="text-muted-foreground h-20 w-full"
        />
        <CardTitle>상품 이름</CardTitle>
        <CardDescription>가격</CardDescription>
      </CardContent>
    </Card>
  );
}
