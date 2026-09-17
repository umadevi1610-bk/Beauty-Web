import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("zooya-cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("zooya-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = cartItems.reduce((total, item) => {
    const itemDiscount = item.originalPrice ? item.originalPrice - item.price : 0;
    return total + itemDiscount * item.quantity;
  }, 0);

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 99;
  const total = subtotal + delivery;

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      subtotal,
      discount,
      delivery,
      total,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }),
    [cartItems, cartCount, subtotal, discount, delivery, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);