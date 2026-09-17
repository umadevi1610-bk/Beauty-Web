import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import SearchModal from "./SearchModal";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="announcement-bar">
          1st order free shipping on orders over ₹999 | Free returns within 30 days..!!
        </div>

        <nav className="navbar container" aria-label="Main navigation">
          <Link to="/" className="logo" onClick={closeMenu}>
            ZOYAA<span>Beauty</span>
          </Link>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                end={item.to === "/"}
                to={item.to}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="nav-icon"
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </button>

            <button
              className="nav-icon theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
            </button>

            <Link className="nav-icon count-icon" to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`}>
              <Heart size={20} />
              {wishlistCount > 0 && <span>{wishlistCount}</span>}
            </Link>

            <Link className="nav-icon count-icon" to="/cart" aria-label={`Shopping bag, ${cartCount} items`}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </Link>

            <button
              className="nav-icon mobile-menu-button"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </nav>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}