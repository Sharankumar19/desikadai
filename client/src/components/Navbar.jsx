import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const categories = [
  {
    label: "Seeds",
    icon: "🌱",
    items: [
      { to: "/seeds/vegetable", label: "Vegetable Seeds" },
      { to: "/seeds/flower", label: "Flower Seeds" },
      { to: "/seeds/paddy", label: "Paddy & Grains" },
      { to: "/seeds/herbs", label: "Herb Seeds" },
    ],
  },
  {
    label: "Fertilizers",
    icon: "💧",
    items: [
      { to: "/fertilizers/npk", label: "NPK Fertilizers", badge: "10% off" },
      { to: "/fertilizers/organic", label: "Organic Manure" },
      { to: "/fertilizers/micro", label: "Micronutrients" },
      { to: "/fertilizers/liquid", label: "Liquid Fertilizers" },
    ],
  },
  {
    label: "Pesticides",
    icon: "🛡️",
    items: [
      { to: "/pesticides/insecticides", label: "Insecticides" },
      { to: "/pesticides/fungicides", label: "Fungicides" },
      { to: "/pesticides/weedicides", label: "Weedicides" },
      { to: "/pesticides/bio", label: "Bio-pesticides" },
    ],
  },
  {
    label: "Farm Tools",
    icon: "🔧",
    items: [
      { to: "/tools/hand", label: "Hand Tools" },
      { to: "/tools/power", label: "Power Tools" },
      { to: "/tools/sprayers", label: "Sprayers" },
    ],
  },
];

const navLinks = [
  { to: "/offers", label: "Offers" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const searchCategories = [
  "All",
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Farm Tools",
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCat, setSearchCat] = useState("All");
  const [openDrop, setOpenDrop] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpenDrop(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpenDrop(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&cat=${searchCat}`);
    }
  };

  return (
    <nav className="">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-2xl">🌿</span>
              <span className="font-display text-xl font-bold text-green-900">
                Desikadai
              </span>
            </Link>

            {/* Action icons */}
            <div className="flex items-center gap-1 ml-auto">
              <Link
                to="/account"
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs hidden sm:block">Sign in</span>
              </Link>

              <Link
                to="/cart"
                className="relative flex flex-col items-center gap-0.5 px-3 py-1 rounded hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="text-xs hidden sm:block">Cart</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
                className="md:hidden p-2 hover:bg-white/20 rounded transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category bar ────────────────────────────────────────── */}
      <div className="bg-moss hidden md:block" ref={dropRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center ">
          {categories.map((cat) => (
            <div key={cat.label} className="relative">
              <button
                onClick={() =>
                  setOpenDrop(openDrop === cat.label ? null : cat.label)
                }
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-[3px] ${
                  openDrop === cat.label
                    ? "text-white border-orange-500 bg-white/10"
                    : "text-green-100 border-transparent hover:text-white hover:bg-white/10 hover:border-orange-400"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}

                <svg
                  className={`w-3.5 h-3.5 transition-transform ${
                    openDrop === cat.label ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openDrop === cat.label && (
                <div className="absolute top-full left-0 bg-white rounded-b-lg shadow-xl min-w-[220px] z-[9999] border-t-[3px] border-orange-500">
                  {cat.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#2d6a2d] border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <span>{item.label}</span>

                      {item.badge && (
                        <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-medium">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-[3px] transition-all ${
                location.pathname === to
                  ? "text-white border-orange-500"
                  : "text-green-100 border-transparent hover:text-white hover:border-orange-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          {categories.map((cat) => (
            <div key={cat.label}>
              <button
                onClick={() =>
                  setOpenDrop(openDrop === cat.label ? null : cat.label)
                }
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-green-50"
              >
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.label}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${openDrop === cat.label ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openDrop === cat.label && (
                <div className="bg-green-50 pl-8">
                  {cat.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 border-b border-green-100 last:border-0 hover:text-[#2d6a2d]"
                    >
                      {item.label}
                      {item.badge && (
                        <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-medium">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-green-50"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
