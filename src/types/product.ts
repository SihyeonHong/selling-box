export interface Product {
  userId: string;
  productId: string;
  name: string;
  prize: number | null;
  description: string | null;
  images: string[]; // images[0] = 썸네일
}
