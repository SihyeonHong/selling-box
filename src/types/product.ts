export interface Product {
  userId: string;
  productId: string;
  name: string;
  prize: number | null;
  description: string | null;
  images: string[]; // images[0] = 썸네일
  state: SaleState;
  uploadedAt: Date | string;
  editedAt: Date | string;
}

export interface TempProduct {
  tempId: string;
  name: string;
  prize: number | null;
  description: string | null;
  images: string[];
  state: SaleState;
}

export const SALE_STATE_CONFIG = {
  ACTIVE: { label: "판매중", className: "bg-green-100 text-green-800" },
  PRIVATE: { label: "비공개", className: "bg-gray-100 text-gray-800" },
  TRADING: { label: "거래중", className: "bg-blue-100 text-blue-800" },
  RESERVED: { label: "예약", className: "bg-yellow-100 text-yellow-800" },
  SOLD: { label: "완료", className: "bg-red-100 text-red-800" },
} as const;

export type SaleState = keyof typeof SALE_STATE_CONFIG;
