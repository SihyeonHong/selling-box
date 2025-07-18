import ProductCard from "@/components/market/product-card";

export default function GalleryForProducts() {
  const cardCount = 11;

  return (
    <div className="grid w-full auto-cols-fr grid-cols-3 gap-2">
      {Array.from({ length: cardCount }, (_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
}
