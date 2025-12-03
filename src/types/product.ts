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

export const SALE_STATE_LIST = [
  "ACTIVE", // 판매 중
  "PRIVATE", // 비공개
  "TRADING", // 거래 진행 중
  "RESERVED", // 거래 예약
  "SOLD", // 판매 완료
] as const;

export type SaleState = (typeof SALE_STATE_LIST)[number];
