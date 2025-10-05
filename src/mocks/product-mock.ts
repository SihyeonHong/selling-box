import { Faker, ko, en } from "@faker-js/faker";

import { Product } from "@/types/product";
import { generateUniqueProductName } from "@/utils/product-name";

const faker = new Faker({ locale: [ko, en] });

/**
 * 단일 Product 더미 데이터를 생성합니다.
 */
export function createMockProduct(): Product {
  // picsum.photos에서 랜덤 이미지 생성
  const randomSeed = faker.string.alphanumeric(10);
  const imageUrl = `https://picsum.photos/seed/${randomSeed}/300/300`;

  return {
    id: faker.string.uuid(),
    name: generateUniqueProductName(),
    prize: faker.number.int({ min: 1000, max: 1000000 }),
    image: imageUrl,
    description: faker.commerce.productDescription(),
  };
}

/**
 * 지정된 개수만큼 Product 더미 데이터 배열을 생성합니다.
 * @param count 생성할 Product 개수
 * @returns Product 배열
 */
export function createMockProducts(count: number): Product[] {
  return Array.from({ length: count }, () => createMockProduct());
}

/**
 * 11개의 Product 더미 데이터를 생성합니다.
 * GalleryForProducts에서 사용하는 기본 개수입니다.
 */
export function createDefaultMockProducts(): Product[] {
  return createMockProducts(11);
}
