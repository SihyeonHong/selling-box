"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/common/shadcn/button";
import { Card } from "@/components/common/shadcn/card";
import { Input } from "@/components/common/shadcn/input";
import { Label } from "@/components/common/shadcn/label";
import { Product } from "@/types/product";
import { generateUniqueProductName } from "@/utils/product-name";

export default function ProductRegistration() {
  const [formData, setFormData] = useState({
    name: generateUniqueProductName(),
    prize: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "상품명을 입력해주세요.";
    }

    if (formData.prize && isNaN(Number(formData.prize))) {
      newErrors.prize = "가격은 숫자로 입력해주세요.";
    }

    if (formData.prize && Number(formData.prize) < 0) {
      newErrors.prize = "가격은 0 이상이어야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData: Product = {
      productId: "",
      name: formData.name.trim(),
      prize: formData.prize ? Number(formData.prize) : null,
      description: formData.description.trim() || null,
      images: [],
      userId: "test-user-id",
      state: "ACTIVE",
    };

    console.log("상품 등록:", productData);
    console.log("선택된 파일:", selectedFile);

    // 폼 초기화
    setFormData({
      name: generateUniqueProductName(),
      prize: "",
      description: "",
    });
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    // 이전 미리보기 URL 정리
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // 새 파일이 있으면 미리보기 URL 생성
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl p-6">
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-center text-2xl font-bold">상품 등록</h2>
          <p className="text-muted-foreground text-center">
            새로운 상품을 등록해보세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">상품명 *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="상품명을 입력하세요"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prize">가격</Label>
            <Input
              id="prize"
              type="number"
              value={formData.prize}
              onChange={(e) => handleInputChange("prize", e.target.value)}
              placeholder="가격을 입력하세요 (선택사항)"
              min="0"
              className={errors.prize ? "border-red-500" : ""}
            />
            {errors.prize && (
              <p className="text-sm text-red-500">{errors.prize}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">상품 설명</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="상품에 대한 설명을 입력하세요 (선택사항)"
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[80px] w-full resize-y rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">상품 이미지</Label>
            <Input
              ref={fileInputRef}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="space-y-2">
                {previewUrl && (
                  <div className="mt-2">
                    <p className="mb-2 text-sm font-medium">
                      선택된 파일: {selectedFile.name} (
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    <Image
                      src={previewUrl}
                      alt="상품 이미지 미리보기"
                      width={400}
                      height={256}
                      className="h-auto max-h-64 max-w-full object-contain"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              상품 등록
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setFormData({
                  name: generateUniqueProductName(),
                  prize: "",
                  description: "",
                });
                setSelectedFile(null);
                if (previewUrl) {
                  URL.revokeObjectURL(previewUrl);
                }
                setPreviewUrl(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                setErrors({});
              }}
            >
              초기화
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
