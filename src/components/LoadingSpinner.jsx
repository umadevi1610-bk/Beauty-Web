export default function LoadingSpinner({ label = "Loading products..." }) {
  return (
    <div className="loading-state" role="status">
      <span className="spinner" />
      <p>{label}</p>
    </div>
  );
}