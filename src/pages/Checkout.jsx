import { CheckCircle2, ChevronLeft, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";

const initialForm = {
  fullName: "", email: "", phone: "", address: "",
  city: "", state: "", pincode: "", payment: "cod"
};

export default function Checkout() {
  const { cartItems, total, subtotal, delivery, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState("");

  if (!cartItems.length && !orderNumber) {
    return (
      <main className="section"><div className="container">
        <EmptyState title="Your bag is empty." text="Add something you love before checking out." actionLabel="Shop ZOYAA" actionLink="/shop" />
      </div></main>
    );
  }

  const validate = () => {
    const nextErrors = {};
    if (form.fullName.trim().length < 2) nextErrors.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) nextErrors.phone = "Enter a valid 10-digit phone number.";
    if (form.address.trim().length < 8) nextErrors.address = "Please enter your complete address.";
    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.state.trim()) nextErrors.state = "State is required.";
    if (!/^\d{6}$/.test(form.pincode)) nextErrors.pincode = "Enter a valid 6-digit pincode.";
    return nextErrors;
  };

  const submitOrder = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setOrderNumber(`VL${Date.now().toString().slice(-7)}`);
    clearCart();
  };

  if (orderNumber) {
    return (
      <main className="section"><div className="container">
        <section className="order-success">
          <CheckCircle2 size={58} />
          <p className="eyebrow">ORDER CONFIRMED</p>
          <h1>Your ritual is on its way.</h1>
          <p>Thank you, {form.fullName.split(" ")[0]}. Your order <strong>#{orderNumber}</strong> has been placed successfully.</p>
          <p>A confirmation is on its way to <strong>{form.email}</strong>.</p>
          <Link className="button button-primary" to="/shop">Continue shopping</Link>
        </section>
      </div></main>
    );
  }

  const field = (name, label, type = "text", placeholder = "") => (
    <label className="form-field">
      <span>{label}</span>
      <input
        type={type}
        value={form[name]}
        placeholder={placeholder}
        onChange={(event) => setForm({ ...form, [name]: event.target.value })}
      />
      {errors[name] && <small className="form-error">{errors[name]}</small>}
    </label>
  );

  return (
    <main className="section checkout-page">
      <div className="container">
        <Link className="back-link" to="/cart"><ChevronLeft size={17} /> Back to bag</Link>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submitOrder} noValidate>
            <p className="eyebrow">SECURE CHECKOUT</p>
            <h1>Almost yours.</h1>

            <section>
              <h2>Contact details</h2>
              <div className="form-grid">
                {field("fullName", "Full name", "text", "Your full name")}
                {field("email", "Email address", "email", "you@example.com")}
                {field("phone", "Phone number", "tel", "10-digit mobile number")}
              </div>
            </section>

            <section>
              <h2>Delivery address</h2>
              <div className="form-grid">
                <label className="form-field full-width">
                  <span>Address</span>
                  <textarea
                    value={form.address}
                    placeholder="House number, street, landmark"
                    onChange={(event) => setForm({ ...form, address: event.target.value })}
                  />
                  {errors.address && <small className="form-error">{errors.address}</small>}
                </label>
                {field("city", "City")}
                {field("state", "State")}
                {field("pincode", "Pincode", "text", "6-digit pincode")}
              </div>
            </section>

            <section>
              <h2>Payment method</h2>
              <div className="payment-options">
                {[["cod", "Cash on delivery", "Pay when your ZOYAA order arrives."], ["upi", "UPI", "Pay securely with any UPI app."], ["card", "Credit or debit card", "Your card details are never stored."]].map(([value, title, text]) => (
                  <label className={`payment-option ${form.payment === value ? "selected" : ""}`} key={value}>
                    <input type="radio" name="payment" value={value} checked={form.payment === value} onChange={(event) => setForm({ ...form, payment: event.target.value })} />
                    <span><strong>{title}</strong><small>{text}</small></span>
                  </label>
                ))}
              </div>
            </section>

            <button className="button button-primary place-order" type="submit">
              <LockKeyhole size={17} /> Place secure order
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Your order</h2>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <span><strong>{item.name}</strong><small>Qty {item.quantity}</small></span>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="summary-lines">
              <p><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></p>
              <p><span>Delivery</span><strong>{delivery ? formatPrice(delivery) : "Complimentary"}</strong></p>
              <p className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}