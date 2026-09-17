import { Star } from "lucide-react";

export default function RatingStars({ rating, showValue = true }) {
  return (
    <div className="rating" aria-label={`${rating} out of 5 stars`}>
      <Star size={15} fill="currentColor" strokeWidth={0} />
      {showValue && <span>{rating}</span>}
    </div>
  );
}