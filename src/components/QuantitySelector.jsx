import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ quantity, onChange, compact = false }) {
  return (
    <div className={`quantity-selector ${compact ? "compact" : ""}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
      >
        <Minus size={15} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}