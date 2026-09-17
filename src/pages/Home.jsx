import { ArrowRight, ChevronRight, Heart, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import ProductGrid from "../components/ProductGrid";
import Newsletter from "../components/Newsletter";
import Toast from "../components/Toast";

const categoryCards = [
  {
    name: "Skincare",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Haircare",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Fragrance",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85"
  }
];

const features = [
  { icon: Heart, title: "Cruelty-free", text: "Always considered, never tested on animals." },
  { icon: Leaf, title: "Clean ingredients", text: "Thoughtful formulas made for daily rituals." },
  { icon: Truck, title: "Fast delivery", text: "Free delivery on orders above ₹999." },
  { icon: ShieldCheck, title: "Secure checkout", text: "Your details are protected with care." }
];

const reviews = [
  { name: "Aarohi M.", rating: "★★★★★", text: "The Glow Serum has become my everyday essential. It makes my skin look rested even on the busiest days." },
  { name: "Ishita R.", rating: "★★★★★", text: "ZOYAA feels polished, calm, and genuinely easy to use. The formulas are beautiful too." },
  { name: "Naina S.", rating: "★★★★★", text: "Soft Blur Foundation looks like skin — just a much better version of it. I am fully converted." }
];

export default function Home() {
  const [toast, setToast] = useState("");
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const newArrivals = products.filter((product) => product.isNew).slice(0, 4);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  return (
    <>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={14} /> Modern beauty rituals</p>
              <h1>Beauty, made <em>effortless.</em></h1>
              <p className="hero-description">
                Discover makeup and skincare designed for your everyday glow.
                Intentional formulas, beautiful results, and a little more ease.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" to="/shop">
                  Shop collection <ArrowRight size={18} />
                </Link>
                <a className="button button-secondary" href="#best-sellers">
                  Explore best sellers
                </a>
              </div>
              <p className="hero-note">Thoughtfully made. Uncomplicatedly beautiful.</p>
            </div>

            <div className="hero-visual">
              <div className="hero-shape shape-one" />
              <div className="hero-shape shape-two" />
              <img
                className="hero-main-image"
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=90"
                alt="Premium ZOYAA skincare products"
              />
              <div className="hero-product-note">
                <span>01</span>
                <p>Small rituals.<br />Remarkable glow.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section category-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">SHOP BY RITUAL</p>
                <h2>Made for every version of you.</h2>
              </div>
              <Link to="/shop" className="text-link">Shop all <ArrowRight size={17} /></Link>
            </div>

            <div className="category-grid">
              {categoryCards.map((category) => (
                <Link
                  className="category-card"
                  to={`/shop?category=${category.name}`}
                  key={category.name}
                >
                  <img src={category.image} alt={`${category.name} collection`} loading="lazy" />
                  <div>
                    <h3>{category.name}</h3>
                    <span>Explore <ChevronRight size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section product-section" id="best-sellers">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">MOST LOVED</p>
                <h2>Our best sellers</h2>
              </div>
              <Link to="/shop?sort=rating" className="text-link">View all <ArrowRight size={17} /></Link>
            </div>
            <ProductGrid products={featured} onNotify={notify} />
          </div>
        </section>

        <section className="offer-banner">
          <div className="container offer-content">
            <div>
              <p className="eyebrow">THE ZOYAA EDIT</p>
              <h2>Glow more,<br /><em>spend less.</em></h2>
            </div>
            <div className="offer-details">
              <p>Up to 30% off selected beauty essentials. Your new daily favourites are waiting.</p>
              <Link className="button button-light" to="/shop">Shop offers <ArrowRight size={17} /></Link>
            </div>
          </div>
        </section>

        <section className="section product-section arrivals-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">JUST DROPPED</p>
              <h2>New arrivals, made to be noticed.</h2>
            </div>
            <ProductGrid products={newArrivals} onNotify={notify} />
          </div>
        </section>

        <section className="section values-section">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="eyebrow">WHY ZOYAA</p>
              <h2>Beauty with a little more intention.</h2>
            </div>
            <div className="feature-grid">
              {features.map(({ icon: Icon, title, text }) => (
                <article className="feature-card" key={title}>
                  <div className="feature-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section review-section">
          <div className="container">
            <div className="section-heading centered-heading">
              <p className="eyebrow">THE ZOYAA COMMUNITY</p>
              <h2>Words we keep close.</h2>
            </div>
            <div className="review-grid">
              {reviews.map((review) => (
                <article className="review-card" key={review.name}>
                  <p className="review-stars">{review.rating}</p>
                  <blockquote>“{review.text}”</blockquote>
                  <p className="review-name">{review.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section newsletter-section">
          <div className="container">
            <Newsletter />
          </div>
        </section>
      </main>
      <Toast message={toast} onClose={() => setToast("")} />
    </>
  );
}