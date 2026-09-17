import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("zooya-wishlist")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("zooya-wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isWishlisted = (productId) =>
    wishlistItems.some((product) => product.id === productId);

  const toggleWishlist = (product) => {
    setWishlistItems((currentItems) =>
      currentItems.some((item) => item.id === product.id)
        ? currentItems.filter((item) => item.id !== product.id)
        : [...currentItems, product]
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isWishlisted,
        toggleWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);