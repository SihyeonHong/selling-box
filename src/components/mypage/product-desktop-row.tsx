"use client";

import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

import { TableCell, TableRow } from "@/components/common/shadcn/table";
import { SALE_STATE_CONFIG, SaleState, TempProduct } from "@/types/product";

interface ProductDesktopRowProps {
  product: TempProduct;
  onRemove: (tempId: string) => void;
  onUpdate: (tempId: string, field: keyof TempProduct, value: unknown) => void;
  onRemoveImage: (tempId: string, imageUrl: string) => void;
}

export default function ProductDesktopRow({
  product,
  onRemove,
  onUpdate,
  onRemoveImage,
}: ProductDesktopRowProps) {
  return (
    <TableRow key={product.tempId} className="hover:bg-gray-50">
      <TableCell className="w-8">
        <button
          onClick={() => onRemove(product.tempId)}
          className="cursor-pointer"
        >
          ❌
        </button>
      </TableCell>
      <TableCell colSpan={4} className="p-2 sm:p-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1.5 sm:gap-2">
              {product.images.length === 0 ? (
                <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-400 sm:h-16 sm:w-16">
                  <ImageIcon size={16} className="sm:h-5 sm:w-5" />
                </div>
              ) : (
                product.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="group relative">
                    <Image
                      src={img}
                      alt=""
                      width={64}
                      height={64}
                      unoptimized
                      className="h-12 w-12 rounded border border-gray-300 object-cover sm:h-16 sm:w-16"
                    />
                    {imgIndex === 0 && (
                      <span className="absolute top-0 left-0 rounded-tl bg-blue-600 px-0.5 text-[10px] text-white sm:px-1 sm:text-xs">
                        썸네일
                      </span>
                    )}
                    <button
                      onClick={() => onRemoveImage(product.tempId, img)}
                      className="absolute -top-1 -right-1 cursor-pointer rounded-full bg-red-500 p-0.5 text-white opacity-0 transition group-hover:opacity-100 sm:-top-2 sm:-right-2 sm:p-1"
                    >
                      <X size={10} className="sm:h-3 sm:w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <input
              type="text"
              value={product.name}
              onChange={(e) => onUpdate(product.tempId, "name", e.target.value)}
              placeholder="상품명 입력"
              className="flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-3 sm:py-2 sm:text-base"
            />
            <input
              type="number"
              value={product.prize || ""}
              onChange={(e) =>
                onUpdate(
                  product.tempId,
                  "prize",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              placeholder="가격 미정"
              className="w-24 rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-32 sm:px-3 sm:py-2 sm:text-base"
            />
            <select
              value={product.state}
              onChange={(e) =>
                onUpdate(product.tempId, "state", e.target.value)
              }
              className="rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-3 sm:py-2 sm:text-base"
            >
              {(Object.keys(SALE_STATE_CONFIG) as SaleState[]).map((state) => (
                <option key={state} value={state}>
                  {SALE_STATE_CONFIG[state].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              value={product.description || ""}
              onChange={(e) =>
                onUpdate(product.tempId, "description", e.target.value || null)
              }
              placeholder="상세 설명 (선택)"
              className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-3 sm:py-2 sm:text-base"
            />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
