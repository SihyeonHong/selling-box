/**
 * 상품명 생성을 위한 유틸리티 함수들
 */

/**
 * 타임스탬프 기반의 고유한 상품명을 생성합니다.
 * 형식: "상품_타임스탬프"
 *
 * @returns 고유한 상품명 문자열
 */
export function generateUniqueProductName(): string {
  const timestamp = Date.now();
  return `상품_${timestamp}`;
}

/**
 * 상품명이 비어있거나 공백만 있는지 확인합니다.
 *
 * @param name 확인할 상품명
 * @returns 비어있으면 true, 아니면 false
 */
export function isEmptyProductName(name: string): boolean {
  return !name || name.trim().length === 0;
}
