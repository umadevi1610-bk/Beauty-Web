import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import ProductGrid from "../components/ProductGrid";
import EmptyState from "../components/EmptyState";
import Toast from "../components/Toast";

export default function Wishlist() {
  const { wishlistItems } = useWishlist();
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  return (
    <>
      <main className="section wishlist-page">
        <div className="container">
          <div className="page-intro compact-intro">
            <p className="eyebrow">SAVED FOR LATER</p>
            <h1>Your ZOYAA <em>edit.</em></h1>
            {wishlistItems.length > 0 && (
              <p>{wishlistItems.length} {wishlistItems.length === 1 ? "piece" : "pieces"} chosen with care.</p>
            )}
          </div>

          {wishlistItems.length ? (
            <ProductGrid products={wishlistItems} onNotify={notify} />
          ) : (
            <EmptyState
              title="Your edit is still taking shape."
              text="Save beauty essentials you love, then come back whenever the moment feels right."
              actionLabel="Discover products"
              actionLink="/shop"
            />
          )}
        </div>
      </main>
      <Toast message={toast} onClose={() => setToast("")} />
    </>
  );
}