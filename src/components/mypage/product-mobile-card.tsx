"use client";

import { TempProduct } from "@/types/product";

interface ProductMobileCardProps {
  product: TempProduct;
  onRemove: (tempId: string) => void;
  onUpdate: (tempId: string, field: keyof TempProduct, value: unknown) => void;
  onRemoveImage: (tempId: string, imageUrl: string) => void;
}

export default function ProductMobileCard({}: ProductMobileCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-center text-sm text-gray-500">
        모바일 카드 형식 컴포넌트 개발 예정
      </div>
    </div>
  );
}
