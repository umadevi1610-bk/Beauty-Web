import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onNotify, className = "" }) {
  return (
    <div className={`product-grid ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onNotify={onNotify} />
      ))}
    </div>
  );
}