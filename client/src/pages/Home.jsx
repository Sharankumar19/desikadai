import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import seedImg from "../image/seed.avif";
import pesti from "../image/pesti.avif";
import tools from "../image/tools.avif";
import pot from "../image/pot.avif";
import soil from "../image/soil.avif";
import ferti from "../image/ferti.avif";
import LiveVisitors from "../components/LiveVisitHome";

// const CATEGORIES = [
//   "all",
//   "grow bag",
//   "Laundry Essentials",
//   "fertilizers",
//   "skin care",
//   "seeds",
// ];

const CATEGORIES = [
  {
    label: "all",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop&crop=center",
  },
  {
    label: "seeds",
    img: seedImg,
  },
  {
    label: "fertilizers",
    img: ferti,
  },
  {
    label: "pesticides",
    img: pesti,
  },
  {
    label: "tools",
    img: tools,
  },
  {
    label: "pots",
    img: pot,
  },
  {
    label: "soil",
    img: soil,
  },
  {
    label: "plants",
    img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&h=200&fit=crop&crop=center",
  },
];

const trustItems = [
  ["🚚", "Free delivery all over Tamil Nadu"],
  ["🌿", "100% naturally grown"],
  ["📦", "Safe & secure packaging"],
  ["⭐", "Trusted by 10,000+ customers"],
  ["🔒", "100% secure payments"],
  ["♻️", "Eco-friendly packaging"],
];

const slides = [
  {
    bg: "from-moss via-leaf to-sage",
    eyebrow: "🌱 Welcome to Desikadai",
    heading: (
      <>
        Bring Nature <br />
        <span className="italic text-forest-200">Into Your Home</span>
      </>
    ),
    body: "Discover our handpicked collection of beautiful plants, succulents, and accessories. Free delivery for all orders.",
    primaryLabel: "Shop Now",
    secondaryLabel: "Explore Plants",
    emojis: [
      { emoji: "🌿", style: "top-10 left-10 text-9xl" },
      { emoji: "🌱", style: "top-20 right-20 text-7xl" },
      { emoji: "🍃", style: "bottom-10 left-1/3 text-8xl" },
      { emoji: "🌾", style: "bottom-5 right-10 text-6xl" },
    ],
  },
  {
    bg: "from-moss via-leaf to-sage",
    eyebrow: "🪴 Fresh Arrivals",
    heading: (
      <>
        Indoor Plants <br />
        <span className="italic text-sky-200">For Every Space</span>
      </>
    ),
    body: "From low-maintenance succulents to lush tropical greens — find the perfect plant for any corner of your home.",
    primaryLabel: "View Collection",
    secondaryLabel: "Learn Care Tips",
    emojis: [
      { emoji: "🌊", style: "top-10 right-10 text-8xl" },
      { emoji: "💧", style: "bottom-14 left-8 text-7xl" },
      { emoji: "🪴", style: "top-1/3 left-1/2 text-9xl" },
    ],
  },
  {
    bg: "from-moss via-leaf to-sage",
    eyebrow: "🌸 Seasonal Offer",
    heading: (
      <>
        Flowering Plants <br />
        <span className="italic text-amber-200">Up to 40% Off</span>
      </>
    ),
    body: "Brighten your space with our curated seasonal blooms. Limited time deals on roses, marigolds, and more.",
    primaryLabel: "Grab Deals",
    secondaryLabel: "See All Offers",
    emojis: [
      { emoji: "🌸", style: "top-12 left-5 text-9xl" },
      { emoji: "🌺", style: "top-20 right-16 text-7xl" },
      { emoji: "🌻", style: "bottom-10 right-1/3 text-8xl" },
    ],
  },
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

  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  // Auto-swipe every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 4000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <div>
      {/* Hero Banner */}
      <LiveVisitors/>
          <section className="w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[340px]">
        
        {/* Image Side */}
        <div className="relative lg:w-[52%] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776484035/WhatsApp_Image_2026-04-18_at_09.12.06_xrzxhz.jpg"
            alt="Farmer harvesting fresh vegetables"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1a3320]" />
        </div>

        {/* Content Side */}
        <div className="relative flex-1 bg-[#1a3320] flex flex-col justify-center px-8 py-10 lg:px-10">
          
          {/* Eyebrow */}
          <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#a8d5a2] mb-3">
            Farm Fresh · Garden to Table
          </p>

          {/* Heading */}
          <h1 className="font-display text-4xl lg:text-5xl font-black leading-tight text-[#f5f0e8] mb-4">
            Grown with
            <span className="block text-[#7ecb6e]">
              Love & Soil
            </span>
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["100% Organic", "Home Grown", "Chemical Free"].map((item) => (
              <span
                key={item}
                className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#7ecb6e]/15 text-[#a8d5a2] border border-[#7ecb6e]/30"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-[#b8cdb3] leading-7 max-w-xs mb-7">
            From our hands to your table — fresh vegetables, fruits,
            and flowers harvested daily from a thriving backyard garden.
          </p>

          {/* Button */}
          <button className="inline-flex items-center gap-2 bg-[#7ecb6e] text-[#0d1f0f] px-6 py-3 font-bold uppercase tracking-wide text-sm hover:bg-[#a8e89a] transition w-fit">
            Explore Our Garden ↗
          </button>

          {/* Decorative Leaf */}
          <div className="absolute bottom-5 right-5 text-7xl opacity-10 pointer-events-none">
            🌿
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#7ecb6e] px-6 py-3 flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d1f0f]">
          🥬 Bottle Gourd
        </div>

        <span className="w-1.5 h-1.5 rounded-full bg-[#0d1f0f]/40" />

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d1f0f]">
          🍅 Tomatoes
        </div>

        <span className="w-1.5 h-1.5 rounded-full bg-[#0d1f0f]/40" />

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d1f0f]">
          🌸 Fresh Flowers
        </div>

        <span className="w-1.5 h-1.5 rounded-full bg-[#0d1f0f]/40" />

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d1f0f]">
          🌿 Seasonal Greens
        </div>
      </div>
    </section>

      {/* Features Strip */}
    <section className="bg-moss overflow-hidden py-2.5">
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
      >
        {/* Render twice for seamless loop */}
        {[...trustItems, ...trustItems].map(([icon, text], i) => (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-2 px-10 whitespace-nowrap text-white text-sm font-medium">
              <span className="text-lg">{icon}</span>
              <span>{text}</span>
            </div>
            <span className="text-white/30 text-lg">✦</span>
          </div>
        ))}
      </div>
    </section>

      {/* Products Section */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-800 mb-3">
            Our Collection
          </h2>
        </div>

        {/* Search & Filter */}
   <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-2 py-3"   style={{
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}>
  {CATEGORIES.map(({ label, img }) => (
    <button
      key={label}
      onClick={() => setCategory(label)}
      aria-label={`Filter by ${label}`}
      className="flex flex-col items-center gap-3 flex-shrink-0 group bg-transparent border-none p-0 cursor-pointer"
    >
      {/* Large Circle Image */}
      <div
        className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden transition-all duration-300 ${
          category === label
            ? "border-[4px] border-[#C1440E] scale-105 ring-4 ring-[#C1440E]/20"
            : "border-[4px] border-stone-200 group-hover:border-orange-400 group-hover:scale-105"
        }`}
      >
        <img
          src={img}
          alt={label}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category Name */}
      <span
        className={`text-sm sm:text-base capitalize whitespace-nowrap transition-colors ${
          category === label
            ? "text-[#C1440E] font-bold"
            : "text-stone-600 font-medium group-hover:text-stone-800"
        }`}
      >
        {label}
      </span>
    </button>
  ))}
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
                areia-label="Previous page"
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
                    aria-label="preview-button"
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
                aria-label="next-button"
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
