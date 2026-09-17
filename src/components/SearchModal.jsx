import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products
        .filter((product) =>
          `${product.name} ${product.category}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Search ZOYAA products"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-input-wrap">
          <Search size={20} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skincare, makeup, fragrance..."
            aria-label="Search products"
          />
          <button type="button" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        {query && (
          <div className="search-results">
            {results.length ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search-result"
                  onClick={onClose}
                >
                  <img src={product.image} alt="" />
                  <span>
                    <small>{product.category}</small>
                    <strong>{product.name}</strong>
                  </span>
                </Link>
              ))
            ) : (
              <p className="search-empty">No ZOYAA products matched “{query}”.</p>
            )}
          </div>
        )}

        {!query && (
          <p className="search-hint">Start typing to discover your next favourite.</p>
        )}
      </section>
    </div>
  );
}