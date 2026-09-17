import { Check, Heart, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatPrice, getDiscount, products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import EmptyState from "../components/EmptyState";
import ProductGrid from "../components/ProductGrid";
import QuantitySelector from "../components/QuantitySelector";
import RatingStars from "../components/RatingStars";
import Toast from "../components/Toast";

const productReviews = [
  { name: "Rhea P.", rating: 5, text: "The texture is beautiful and it feels genuinely luxurious to use every day." },
  { name: "Tanya S.", rating: 5, text: "A quiet little staple in my routine. It does exactly what I hoped it would." },
  { name: "Meera K.", rating: 4, text: "Lovely formula, easy to use, and the packaging looks gorgeous on my shelf." }
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [toast, setToast] = useState("");
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!product) {
    return (
      <main className="section">
        <div className="container">
          <EmptyState
            title="This beauty essential has moved"
            text="The product you were looking for is no longer in our collection."
            actionLabel="Explore the collection"
            actionLink="/shop"
          />
        </div>
      </main>
    );
  }

  const saved = isWishlisted(product.id);
  const discount = getDiscount(product);
  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const addProduct = () => {
    addToCart(product, quantity);
    notify(`${product.name} added to your bag`);
  };

  const buyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <>
      <main className="product-detail-page section">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/shop">Shop</Link><span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product-detail-layout">
            <section className="product-gallery">
              <div className="product-main-image">
                <img src={product.image} alt={product.name} />
                {discount > 0 && <span className="discount-badge">Save {discount}%</span>}
              </div>
            </section>

            <section className="product-info">
              <p className="eyebrow">{product.category}</p>
              <h1>{product.name}</h1>
              <div className="detail-rating">
                <RatingStars rating={product.rating} />
                <span>{product.reviews} verified reviews</span>
              </div>

              <div className="detail-price">
                <strong>{formatPrice(product.price)}</strong>
                {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}
                {discount > 0 && <span>You save {formatPrice(product.originalPrice - product.price)}</span>}
              </div>

              <p className="detail-description">{product.description}</p>

              <div className="stock-status">
                <Check size={16} /> <span>{product.stock} — ready to ship</span>
              </div>

              <div className="purchase-controls">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
                <button className="button button-primary add-detail-button" type="button" onClick={addProduct}>
                  <ShoppingBag size={18} /> Add to bag
                </button>
                <button
                  className={`icon-button detail-wishlist ${saved ? "active" : ""}`}
                  type="button"
                  aria-label="Toggle wishlist"
                  onClick={() => {
                    toggleWishlist(product);
                    notify(saved ? "Removed from your wishlist" : "Added to your wishlist");
                  }}
                >
                  <Heart size={20} fill={saved ? "currentColor" : "none"} />
                </button>
              </div>

              <button className="button button-secondary buy-now-button" type="button" onClick={buyNow}>
                Buy now
              </button>

              <div className="shipping-note"><Truck size={19} /><span>Free standard delivery on this order. Usually arrives in 3–5 days.</span></div>
            </section>
          </div>

          <section className="product-tabs">
            <div className="tab-list" role="tablist">
              {["description", "ingredients", "reviews"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === "description" && (
                <div>
                  <h2>Your everyday ritual, elevated.</h2>
                  <p>{product.description} Designed to slot seamlessly into the moments you already make for yourself.</p>
                  <ul>{product.benefits.map((benefit) => <li key={benefit}><Check size={16} />{benefit}</li>)}</ul>
                </div>
              )}
              {activeTab === "ingredients" && (
                <div>
                  <h2>Thoughtfully chosen ingredients.</h2>
                  <p>{product.ingredients}</p>
                  <p>We select each ingredient for a sensorial, effective experience that feels good in every sense.</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="product-review-list">
                  {productReviews.map((review) => (
                    <article key={review.name}>
                      <div><strong>{review.name}</strong><span>{"★".repeat(review.rating)}</span></div>
                      <p>{review.text}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {related.length > 0 && (
            <section className="related-products">
              <div className="section-heading">
                <p className="eyebrow">YOU MAY ALSO LOVE</p>
                <h2>More {product.category.toLowerCase()} essentials.</h2>
              </div>
              <ProductGrid products={related} onNotify={notify} />
            </section>
          )}
        </div>
      </main>
      <Toast message={toast} onClose={() => setToast("")} />
    </>
  );
}