import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";

export default function Cart() {
  const {
    cartItems,
    subtotal,
    discount,
    delivery,
    total,
    updateQuantity,
    removeFromCart
  } = useCart();

  if (!cartItems.length) {
    return (
      <main className="section">
        <div className="container">
          <EmptyState
            title="Your bag is waiting."
            text="Add a few ZOYAA favourites and make your everyday ritual a little more beautiful."
            actionLabel="Start shopping"
            actionLink="/shop"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="section cart-page">
      <div className="container">
        <div className="page-intro compact-intro">
          <p className="eyebrow">YOUR BAG</p>
          <h1>Beautiful things, <em>chosen by you.</em></h1>
        </div>

        <div className="cart-layout">
          <section className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link to={`/product/${item.id}`}><img src={item.image} alt={item.name} /></Link>
                <div className="cart-item-details">
                  <p className="eyebrow">{item.category}</p>
                  <Link to={`/product/${item.id}`}><h2>{item.name}</h2></Link>
                  <strong>{formatPrice(item.price)}</strong>
                  <div className="cart-item-actions">
                    <div className="quantity-selector compact">
                      <button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                    </div>
                    <button className="remove-button" type="button" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
                <strong className="cart-line-total">{formatPrice(item.price * item.quantity)}</strong>
              </article>
            ))}
            <Link className="text-link continue-shopping" to="/shop">← Continue shopping</Link>
          </section>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div><span>Product savings</span><strong className="saving">−{formatPrice(discount)}</strong></div>
            <div><span>Delivery</span><strong>{delivery ? formatPrice(delivery) : "Complimentary"}</strong></div>
            <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <p className="tax-note">Taxes included. Shipping is calculated with care.</p>
            <Link className="button button-primary checkout-button" to="/checkout">
              Proceed to checkout <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}