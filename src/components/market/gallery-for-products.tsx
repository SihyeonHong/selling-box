import ProductCard from "@/components/market/product-card";

export default function GalleryForProducts() {
  const cardCount = 11;

  return (
    <div className="grid w-full auto-cols-fr grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: cardCount }, (_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
}
