import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo">ZOYAA<span>Beauty</span></Link>
          <p>Beauty, made effortless. Thoughtful essentials for your everyday ritual.</p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="ZOYAA on Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="ZOYAA on Facebook">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            <Link to="/shop">Shop all</Link>
            <Link to="/about">Our story</Link>
            <Link to="/contact">Contact us</Link>
          </div>
          <div>
            <h3>Customer care</h3>
            <a href="#shipping">Shipping & delivery</a>
            <a href="#returns">Returns & exchanges</a>
            <a href="#care">Product care</a>
          </div>
        </div>

        <Newsletter compact />
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ZOYAA Beauty. All rights reserved.</p>
        <p className="footer-location">Made for modern rituals <ArrowUpRight size={14} /></p>
      </div>
    </footer>
  );
}