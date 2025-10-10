import AddProductCard from "@/components/mypage/add-product-card";

export default function MyProducts({ userId }: { userId: string }) {
  return (
    <div className="w-full max-w-6xl px-8">
      <h1 className="text-2xl font-bold">내 상품 관리</h1>

      <AddProductCard userId={userId} />
    </div>
  );
}
