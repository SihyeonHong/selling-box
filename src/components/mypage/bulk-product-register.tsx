"use client";

import { Edit, Image as ImageIcon, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/shadcn/table";

type SaleState = "ACTIVE" | "PRIVATE" | "TRADING" | "RESERVED" | "SOLD";

interface Product {
  tempId: string;
  name: string;
  prize: number | null;
  description: string | null;
  images: string[];
  state: SaleState;
}

interface ImagePoolItem {
  id: string;
  url: string;
}

const SALE_STATES: { value: SaleState; label: string; color: string }[] = [
  { value: "ACTIVE", label: "판매중", color: "bg-green-100 text-green-800" },
  { value: "PRIVATE", label: "비공개", color: "bg-gray-100 text-gray-800" },
  { value: "TRADING", label: "거래중", color: "bg-blue-100 text-blue-800" },
  { value: "RESERVED", label: "예약", color: "bg-yellow-100 text-yellow-800" },
  { value: "SOLD", label: "완료", color: "bg-red-100 text-red-800" },
];

export default function BulkProductRegister() {
  const [products, setProducts] = useState<Product[]>([]);
  const [imagePool, setImagePool] = useState<ImagePoolItem[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(
    new Set(),
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImagePool((prev) => [
          ...prev,
          { id: Date.now() + Math.random().toString(), url },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        tempId: Date.now().toString(),
        name: "",
        prize: null,
        description: null,
        images: [],
        state: "ACTIVE",
      },
    ]);
  };

  const updateProduct = (
    tempId: string,
    field: keyof Product,
    value: unknown,
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.tempId === tempId ? { ...p, [field]: value } : p)),
    );
  };

  const removeProduct = (tempId: string) => {
    setProducts((prev) => prev.filter((p) => p.tempId !== tempId));
  };

  const removeImageFromProduct = (tempId: string, imageUrl: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.tempId === tempId
          ? { ...p, images: p.images.filter((img) => img !== imageUrl) }
          : p,
      ),
    );
    setImagePool((prev) => [
      ...prev,
      { id: Date.now().toString(), url: imageUrl },
    ]);
  };

  const toggleImageSelection = (imageId: string) => {
    setSelectedImageIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleRegisterAsIndividualProducts = () => {
    const selectedImages = imagePool.filter((img) =>
      selectedImageIds.has(img.id),
    );
    if (selectedImages.length === 0) return;

    const newProducts = selectedImages.map((img) => ({
      tempId: Date.now().toString() + Math.random().toString(),
      name: "",
      prize: null,
      description: null,
      images: [img.url],
      state: "ACTIVE" as SaleState,
    }));

    setProducts((prev) => [...prev, ...newProducts]);
    setImagePool((prev) => prev.filter((img) => !selectedImageIds.has(img.id)));
    setSelectedImageIds(new Set());
  };

  const handleRegisterAsSingleProduct = () => {
    const selectedImages = imagePool.filter((img) =>
      selectedImageIds.has(img.id),
    );
    if (selectedImages.length === 0) return;

    const imageUrls = selectedImages.map((img) => img.url);

    setProducts((prev) => [
      ...prev,
      {
        tempId: Date.now().toString(),
        name: "",
        prize: null,
        description: null,
        images: imageUrls,
        state: "ACTIVE",
      },
    ]);
    setImagePool((prev) => prev.filter((img) => !selectedImageIds.has(img.id)));
    setSelectedImageIds(new Set());
  };

  const handleEditImages = () => {
    // 추후 모달창과 ImageContainer 연결 예정
    console.log("사진 편집 기능은 추후 구현 예정");
  };

  const handleDeleteSelectedImages = () => {
    setImagePool((prev) => prev.filter((img) => !selectedImageIds.has(img.id)));
    setSelectedImageIds(new Set());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            상품 일괄 등록
          </h1>
          <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            {products.length}개 상품 등록
          </button>
        </div>

        {/* 이미지 풀 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900">이미지 풀</h2>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex min-h-24 cursor-pointer flex-wrap gap-3 rounded-lg border-2 border-dashed border-gray-200 p-3 transition hover:border-gray-300"
          >
            {imagePool.length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center py-8">
                <div className="mb-2 flex items-center gap-2 text-base font-medium text-gray-700">
                  <Plus size={20} />
                  이미지 업로드
                </div>
                <div className="text-sm text-gray-400">
                  클릭하거나 이미지 파일을 여기로 드래그하세요
                </div>
              </div>
            ) : (
              imagePool.map((img) => (
                <div
                  key={img.id}
                  className="relative h-20 w-20 cursor-pointer transition hover:opacity-75"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleImageSelection(img.id);
                  }}
                >
                  <Image
                    src={img.url}
                    alt=""
                    width={80}
                    height={80}
                    unoptimized
                    className="h-full w-full rounded border-2 border-gray-300 object-cover"
                  />
                  <div className="absolute top-1 left-1">
                    <input
                      type="checkbox"
                      checked={selectedImageIds.has(img.id)}
                      onChange={() => toggleImageSelection(img.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 액션 버튼 영역 */}
          <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-200 pt-4">
            <button
              onClick={handleRegisterAsIndividualProducts}
              disabled={selectedImageIds.size === 0}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
            >
              <Plus size={16} />
              각각의 상품으로 등록하기
            </button>
            <button
              onClick={handleRegisterAsSingleProduct}
              disabled={selectedImageIds.size === 0}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600"
            >
              <Plus size={16} />한 상품으로 등록하기
            </button>
            <button
              onClick={handleEditImages}
              disabled={selectedImageIds.size === 0}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-purple-600"
            >
              <Edit size={16} />
              사진 편집하기
            </button>
            <button
              onClick={handleDeleteSelectedImages}
              disabled={selectedImageIds.size === 0}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-600"
            >
              <Trash2 size={16} />
              삭제
            </button>
          </div>
        </div>

        {/* 상품 테이블 */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <Table>
            <TableHeader className="border-b border-gray-200 bg-gray-50">
              <TableRow>
                <TableHead className="w-10 px-3 py-3"></TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  이미지
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상품명
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  가격
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상태
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {products.map((product) => (
                <TableRow key={product.tempId} className="hover:bg-gray-50">
                  <TableCell className="px-3 py-4 align-top">
                    <button
                      onClick={() => removeProduct(product.tempId)}
                      className="cursor-pointer text-red-500 transition hover:text-red-700"
                    >
                      <span className="text-lg">❌</span>
                    </button>
                  </TableCell>
                  <TableCell colSpan={4} className="px-4 py-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          {product.images.length === 0 ? (
                            <div className="flex h-16 w-16 items-center justify-center rounded border-2 border-dashed border-gray-300 text-gray-400">
                              <ImageIcon size={20} />
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
                                  className="h-16 w-16 rounded border border-gray-300 object-cover"
                                />
                                {imgIndex === 0 && (
                                  <span className="absolute top-0 left-0 rounded-tl bg-blue-600 px-1 text-xs text-white">
                                    썸네일
                                  </span>
                                )}
                                <button
                                  onClick={() =>
                                    removeImageFromProduct(product.tempId, img)
                                  }
                                  className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) =>
                            updateProduct(
                              product.tempId,
                              "name",
                              e.target.value,
                            )
                          }
                          placeholder="상품명 입력"
                          className="flex-1 rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                          type="number"
                          value={product.prize || ""}
                          onChange={(e) =>
                            updateProduct(
                              product.tempId,
                              "prize",
                              e.target.value ? Number(e.target.value) : null,
                            )
                          }
                          placeholder="가격 미정"
                          className="w-32 rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <select
                          value={product.state}
                          onChange={(e) =>
                            updateProduct(
                              product.tempId,
                              "state",
                              e.target.value,
                            )
                          }
                          className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          {SALE_STATES.map((state) => (
                            <option key={state.value} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={product.description || ""}
                          onChange={(e) =>
                            updateProduct(
                              product.tempId,
                              "description",
                              e.target.value || null,
                            )
                          }
                          placeholder="상세 설명 (선택)"
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={addProduct}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-gray-300 py-2 text-gray-500 transition hover:border-gray-400 hover:text-gray-600"
            >
              <Plus size={18} />
              상품 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
