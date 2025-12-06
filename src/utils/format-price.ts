export const formatPrice = (price: number | null) => {
  if (price === null) {
    return "가격 미정";
  }
  return price.toLocaleString("ko-KR") + " 원";
};
