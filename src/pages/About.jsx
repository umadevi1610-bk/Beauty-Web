import { Heart, Leaf, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Sparkles, title: "Considered beauty", text: "We edit with purpose: fewer, better products that earn a place in your routine." },
  { icon: Heart, title: "Human by design", text: "Beauty should feel personal, joyful, and never intimidating." },
  { icon: Leaf, title: "Lighter by nature", text: "We are continuously choosing better materials, mindful formulas, and less excess." },
  { icon: Users, title: "Customer first", text: "Your feedback guides every detail — from our formulas to the last unboxing moment." }
];

export default function About() {
  return (
    <main>
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div>
            <p className="eyebrow">OUR STORY</p>
            <h1>Made for your<br /><em>real-life glow.</em></h1>
            <p>ZOYAA began with a simple belief: beauty should add ease, not expectation. We make considered essentials for the moments you choose yourself.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85" alt="Woman enjoying a quiet skincare ritual" />
        </div>
      </section>

      <section className="section story-section">
        <div className="container story-grid">
          <p className="eyebrow">THE ZOYAA PHILOSOPHY</p>
          <div>
            <h2>Beauty gets better when it feels like <em>you.</em></h2>
            <p>We are here for the five-minute routines, the confidence before a big moment, and the quiet reset at the end of a long day. Every ZOYAA product is designed to feel intuitive, effective, and a little special.</p>
            <p>Our collection is intentionally curated across skincare, makeup, haircare, and fragrance — because your routine deserves to work together, beautifully.</p>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <div className="section-heading centered-heading">
            <p className="eyebrow">WHAT MAKES US DIFFERENT</p>
            <h2>Small details. Meaningful difference.</h2>
          </div>
          <div className="feature-grid">
            {values.map(({ icon: Icon, title, text }) => (
              <article className="feature-card" key={title}>
                <div className="feature-icon"><Icon size={22} /></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sustainability-banner">
        <div className="container">
          <p className="eyebrow">A GENTLER FOOTPRINT</p>
          <h2>We are learning, improving,<br />and choosing <em>better.</em></h2>
          <p>From responsible packaging choices to mindful sourcing, we are committed to progress over perfection — always with transparency at the centre.</p>
          <Link className="button button-light" to="/shop">Explore the collection</Link>
        </div>
      </section>
    </main>
  );
}