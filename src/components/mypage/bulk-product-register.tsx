"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

import { Table, TableBody } from "@/components/common/shadcn/table";
import ProductDesktopRow from "@/components/mypage/product-desktop-row";
import ProductMobileCard from "@/components/mypage/product-mobile-card";
import { SaleState, TempProduct } from "@/types/product";

interface ImagePoolItem {
  id: string;
  url: string;
}

export default function BulkProductRegister() {
  const [products, setProducts] = useState<TempProduct[]>([]);
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
    field: keyof TempProduct,
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
    <div className="m-4 min-h-screen space-y-6 bg-gray-50 sm:m-10 sm:max-w-7xl">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">상품 일괄 등록</h1>
        <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          {products.length}개 상품 등록
        </button>
      </header>

      {/* 이미지 풀 */}
      <section className="rounded-lg bg-white p-6 shadow">
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
      </section>

      {/* 상품 목록 */}
      <section className="overflow-hidden rounded-lg bg-white shadow">
        {/* 데스크톱: 테이블 형식 */}
        <div className="hidden sm:block">
          <Table className="table-fixed">
            <TableBody className="divide-y divide-gray-200">
              {products.map((product) => (
                <ProductDesktopRow
                  key={product.tempId}
                  product={product}
                  onRemove={removeProduct}
                  onUpdate={updateProduct}
                  onRemoveImage={removeImageFromProduct}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 모바일: 카드 형식 */}
        <div className="block sm:hidden">
          <div className="divide-y divide-gray-200">
            {products.map((product) => (
              <ProductMobileCard
                key={product.tempId}
                product={product}
                onRemove={removeProduct}
                onUpdate={updateProduct}
                onRemoveImage={removeImageFromProduct}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 p-2 sm:p-4">
          <button
            onClick={addProduct}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded border-2 border-dashed border-gray-300 py-1.5 text-sm text-gray-500 transition hover:border-gray-400 hover:text-gray-600 sm:gap-2 sm:py-2 sm:text-base"
          >
            <Plus size={16} className="sm:h-[18px] sm:w-[18px]" />
            상품 추가
          </button>
        </div>
      </section>
    </div>
  );
}
