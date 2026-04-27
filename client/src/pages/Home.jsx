import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  "all",
  "grow bag",
  "Laundry Essentials",
  "fertilizers",
  "skin care",
  "seeds",
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = {};
        if (debouncedSearch) params.search = debouncedSearch;
        if (category !== "all") params.category = category;

        const res = await axios.get(
          `https://desikadai-backend.onrender.com/api/products`,
          { params },
        );

        setProducts(res.data.data);
      } catch (err) {
        setError(
          "Failed to load products. Please make sure the backend is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-moss via-leaf to-sage overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🌿</div>
          <div className="absolute top-20 right-20 text-7xl">🌱</div>
          <div className="absolute bottom-10 left-1/3 text-8xl">🍃</div>
          <div className="absolute bottom-5 right-10 text-6xl">🌾</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-forest-200 text-sm font-medium tracking-widest uppercase mb-4">
              🌱 Welcome to Desikadai
            </p>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Bring Nature <br />
              <span className="italic text-forest-200">Into Your Home</span>
            </h1>

            <p className="text-forest-100 text-lg leading-relaxed mb-8 max-w-lg">
              Discover our handpicked collection of beautiful plants,
              succulents, and accessories. Free delivery for all orders.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#products"
                className="bg-white text-moss px-6 py-3 rounded-full font-semibold hover:bg-forest-50 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Shop Now
              </a>
              <a
                href="#products"
                className="border-2 border-white/50 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all active:scale-95"
              >
                Explore Plants
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-forest-50 border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm text-stone-600">
            {[
              ["🚚", "Free delivery"],
              ["🌿", "100% naturally grown"],
              ["📦", "Safe & secure packaging"],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2">
                <span>{icon}</span>
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-800 mb-3">
            Our Green Collection
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Every plant is lovingly selected and ready to thrive in your space.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium capitalize ${
                  category === cat
                    ? "bg-moss text-white"
                    : "bg-white border text-stone-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count (fixed height to prevent CLS) */}
        <p className="text-stone-400 text-sm mb-6 min-h-[20px]">
          {!loading && `${products.length} products found`}
        </p>

        {/* Results */}
        {loading ? (
          // ✅ Skeleton Loader (CLS FIX)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-72 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">No products found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination (fixed height) */}
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6 min-h-[48px]">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-40"
              >
                Prev
              </button>

              {/* Pages */}
              {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => {
                const page = i + 1;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border transition ${
                      currentPage === page
                        ? "bg-moss text-white border-moss"
                        : "bg-white text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages || 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 rounded border disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
