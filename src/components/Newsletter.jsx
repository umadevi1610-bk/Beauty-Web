import { useState } from "react";
import { ArrowRight } from "lucide-react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter({ compact = false }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("You’re on the list — welcome to ZOYAA.");
    setEmail("");
  };

  return (
    <div className={`newsletter ${compact ? "newsletter-compact" : ""}`}>
      {!compact && (
        <>
          <p className="eyebrow">ZOYAA NOTES</p>
          <h2>Beauty inspiration, in your inbox.</h2>
          <p>Get early access to launches, quiet luxuries, and member-only offers.</p>
        </>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor={`newsletter-email-${compact}`}>
          Email address
        </label>
        <input
          id={`newsletter-email-${compact}`}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-describedby={`newsletter-message-${compact}`}
        />
        <button type="submit" className="button button-primary">
          Subscribe <ArrowRight size={17} />
        </button>
      </form>

      {message && (
        <p
          id={`newsletter-message-${compact}`}
          className={message.startsWith("Please") ? "form-error" : "form-success"}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
}