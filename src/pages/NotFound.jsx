import EmptyState from "../components/EmptyState";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container">
        <EmptyState
          title="This page has slipped away."
          text="Let’s take you somewhere a little more beautiful."
          actionLabel="Go home"
          actionLink="/"
        />
      </div>
    </main>
  );
}