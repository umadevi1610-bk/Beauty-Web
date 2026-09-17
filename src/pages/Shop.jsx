import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, products } from "../data/products";
import EmptyState from "../components/EmptyState";
import ProductGrid from "../components/ProductGrid";
import Toast from "../components/Toast";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" }
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [priceLimit, setPriceLimit] = useState(2600);
  const [sort, setSort] = useState(searchParams.get("sort") || "featured");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [toast, setToast] = useState("");

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      return matchesSearch && matchesCategory && product.price <= priceLimit;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "newest") return Number(b.isNew) - Number(a.isNew);
      return Number(b.featured) - Number(a.featured);
    });
  }, [query, category, priceLimit, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setPriceLimit(2600);
    setSort("featured");
    setSearchParams({});
  };

  const chooseCategory = (value) => {
    setCategory(value);
    setSearchParams(value === "All" ? {} : { category: value });
  };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const filterControls = (
    <>
      <div className="filter-group">
        <p className="filter-label">Category</p>
        <div className="filter-options">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => chooseCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="price-filter-heading">
          <p className="filter-label">Maximum price</p>
          <strong>₹{priceLimit.toLocaleString("en-IN")}</strong>
        </div>
        <input
          className="price-range"
          type="range"
          min="500"
          max="2600"
          step="100"
          value={priceLimit}
          onChange={(event) => setPriceLimit(Number(event.target.value))}
          aria-label="Maximum price"
        />
        <div className="range-labels"><span>₹500</span><span>₹2,600</span></div>
      </div>

      <button className="reset-filter" type="button" onClick={resetFilters}>
        <X size={16} /> Reset filters
      </button>
    </>
  );

  return (
    <>
      <main className="shop-page section">
        <div className="container">
          <div className="page-intro">
            <h1>Find your everyday favourites.</h1>
          </div>

          <div className="shop-search-row">
            <label className="shop-search">
              <Search size={19} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your next favourite"
              />
            </label>
            <button
              type="button"
              className="mobile-filter-toggle"
              onClick={() => setMobileFilters(true)}
            >
              <Filter size={17} /> Filters
            </button>
          </div>

          <div className="shop-layout">
            <aside className="shop-sidebar">
              <div className="sidebar-title"><SlidersHorizontal size={17} /> Filters</div>
              {filterControls}
            </aside>

            <section className="shop-results">
              <div className="results-toolbar">
                <p>Showing <strong>{visibleProducts.length}</strong> of {products.length} products</p>
                <label className="sort-select">
                  <span>Sort by</span>
                  <select value={sort} onChange={(event) => setSort(event.target.value)}>
                    {sortOptions.map((option) => (
                      <option value={option.value} key={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
              </div>

              {visibleProducts.length ? (
                <ProductGrid products={visibleProducts} onNotify={notify} />
              ) : (
                <EmptyState
                  title="Nothing quite matches"
                  text="Try adjusting your filters — your next beauty essential may be one small change away."
                  actionLabel="Reset filters"
                  onAction={resetFilters}
                />
              )}
            </section>
          </div>
        </div>
      </main>

      {mobileFilters && (
        <div className="modal-backdrop mobile-filter-backdrop" onMouseDown={() => setMobileFilters(false)}>
          <aside className="mobile-filter-panel" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mobile-filter-title">
              <strong>Filters</strong>
              <button type="button" onClick={() => setMobileFilters(false)} aria-label="Close filters"><X /></button>
            </div>
            {filterControls}
            <button className="button button-primary filter-done" type="button" onClick={() => setMobileFilters(false)}>
              Show {visibleProducts.length} products
            </button>
          </aside>
        </div>
      )}

      <Toast message={toast} onClose={() => setToast("")} />
    </>
  );
}