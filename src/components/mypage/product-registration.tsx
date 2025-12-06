"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import NoImage from "@/components/common/no-image";
import { Button } from "@/components/common/shadcn/button";
import { Card } from "@/components/common/shadcn/card";
import { Input } from "@/components/common/shadcn/input";
import { Label } from "@/components/common/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/shadcn/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/shadcn/table";
import { Product, SALE_STATE_CONFIG, SaleState } from "@/types/product";
import { generateUniqueProductName } from "@/utils/product-name";

export default function ProductRegistration() {
  const [formData, setFormData] = useState({
    name: generateUniqueProductName(),
    prize: "",
    description: "",
    state: "ACTIVE",
    uploadedAt: new Date(),
    editedAt: new Date(),
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
      uploadedAt: new Date(),
      editedAt: new Date(),
    };

    console.log("상품 등록:", productData);
    console.log("선택된 파일:", selectedFile);

    // 폼 초기화
    setFormData({
      name: generateUniqueProductName(),
      prize: "",
      description: "",
      state: "ACTIVE",
      uploadedAt: new Date(),
      editedAt: new Date(),
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
    <Card className="mx-auto w-full max-w-6xl p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">상품 등록</h2>
          <p className="text-muted-foreground">새로운 상품을 등록해보세요</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>대표 이미지</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>상세정보</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <NoImage size="sm" rounded="none" />
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <Input
                  id="prize"
                  type="number"
                  value={formData.prize}
                  onChange={(e) => handleInputChange("prize", e.target.value)}
                  placeholder="가격 미정"
                  className={errors.prize ? "border-red-500" : ""}
                />
                {errors.prize && (
                  <p className="text-sm text-red-500">{errors.prize}</p>
                )}
              </TableCell>
              <TableCell>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleInputChange("state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="상태를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(SALE_STATE_CONFIG) as SaleState[]).map(
                      (state) => (
                        <SelectItem key={state} value={state}>
                          {SALE_STATE_CONFIG[state].label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                상세정보: 이미지 multiple input, 그 중에 썸네일 고르기, 상품
                설명. 모달.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setFormData({
                  name: generateUniqueProductName(),
                  prize: "",
                  description: "",
                  state: "ACTIVE",
                  uploadedAt: new Date(),
                  editedAt: new Date(),
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
