import ProductCard from "@/components/market/product-card";
import { createDefaultMockProducts } from "@/mocks/product-mock";

export default function GalleryForProducts() {
  const products = createDefaultMockProducts();

  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
