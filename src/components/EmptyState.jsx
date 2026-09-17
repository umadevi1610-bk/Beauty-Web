import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  text,
  actionLabel,
  actionLink,
  onAction
}) {
  return (
    <section className="empty-state">
      <div className="empty-icon">
        <ShoppingBag size={34} />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      {actionLink ? (
        <Link className="button button-primary" to={actionLink}>
          {actionLabel}
        </Link>
      ) : (
        <button className="button button-primary" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </section>
  );
}