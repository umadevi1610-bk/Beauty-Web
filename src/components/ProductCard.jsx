import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice, getDiscount } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import RatingStars from "./RatingStars";

export default function ProductCard({ product, onNotify }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const discount = getDiscount(product);
  const saved = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    onNotify?.(`${product.name} added to your bag`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    onNotify?.(saved ? "Removed from your wishlist" : "Added to your wishlist");
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>

        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        {product.isNew && <span className="new-badge">New</span>}

        <button
          className={`icon-button wishlist-button ${saved ? "active" : ""}`}
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlist}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-content">
        <p className="eyebrow">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <div className="product-meta">
          <RatingStars rating={product.rating} />
          <span>({product.reviews})</span>
        </div>

        <div className="price-row">
          <strong>{formatPrice(product.price)}</strong>
          {product.originalPrice && (
            <del>{formatPrice(product.originalPrice)}</del>
          )}
        </div>

        <button className="add-cart-button" type="button" onClick={handleAddToCart}>
          <ShoppingBag size={16} />
          Add to bag
        </button>
      </div>
    </article>
  );
}