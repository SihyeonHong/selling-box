import ProductCard from "@/components/product-card";

export default function GalleryForProducts() {
  const cardCount = 11;

  return (
    <div className="grid w-full auto-cols-fr grid-cols-3 gap-2 p-4">
      {Array.from({ length: cardCount }, (_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
}
