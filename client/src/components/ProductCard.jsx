import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function StarRating({ rating = 4, reviews = 0 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.065 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
      <span className="text-[11px] text-stone-400 ml-1">({reviews})</span>
    </div>
  );
}

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const viewers = Math.floor(Math.random() * 15) + 5; // 5 - 20 viewers

  const inCart = cartItems.find((i) => i.id === product.id);
  const discount = product.mrp
    ? Math.round((1 - product.price / product.mrp) * 100)
    : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (product.product_quantity <= 0) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 cursor-pointer transition-all duration-200 hover:-translate-y-1.5 hover:border-[#2d6a2d]"
    >
      {/* ── Image with overlay ──────────────────── */}
      <div className="relative overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="eager"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop";
          }}
          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark gradient at bottom for price readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Top row: category pill + wishlist */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-wide bg-white text-[#2d6a2d] px-3 py-1 rounded-full">
            {product.category}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setWished(!wished);
            }}
            aria-label="Wishlist"
            className={`w-8 h-8 rounded-full flex items-center justify-center border-none transition-all ${
              wished ? "bg-[#2d6a2d]" : "bg-white/90 hover:bg-white"
            }`}
          >
            <svg
              className={`w-4 h-4 ${wished ? "text-white" : "text-[#2d6a2d]"}`}
              fill={wished ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* In-cart pill (top, between category and wish) */}
        {inCart && (
          <span className="absolute top-2.5 right-12 bg-[#2d6a2d] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
            In cart ({inCart.quantity})
          </span>
        )}

        {/* Bottom of image: price + discount */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-2xl font-extrabold text-white leading-none drop-shadow">
              ₹{product.price}
            </p>
            {product.mrp && (
              <p className="text-[11px] text-white/60 line-through">
                ₹{product.mrp}
              </p>
            )}
          </div>
          {discount > 0 && (
            <span className="text-[10px] font-extrabold bg-green-400 text-green-900 px-2 py-1 rounded-lg">
              {discount}% off
            </span>
          )}
        </div>
      </div>

      {/* ── Body ────────────────────────────────── */}
      <div className="px-3.5 pt-3 pb-4">
        <h3 className="text-sm font-bold text-stone-800 leading-snug mb-1 truncate">
          {product.name}
        </h3>

        <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2 mb-2.5">
          {product.description}
        </p>

        <StarRating
          rating={product.rating ?? 4}
          reviews={product.reviews ?? 0}
        />

        {/* Footer: stock dot + add button */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                product.product_quantity > 0 ? "bg-green-500" : "bg-red-400"
              }`}
            />
            <span className="text-[11px] font-semibold text-stone-500">
              {product.product_quantity > 0
                ? `${product.product_quantity} in stock`
                : "Out of stock"}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={product.product_quantity <= 0}
            aria-label="Add to cart"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
              product.product_quantity <= 0
                ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                : added
                  ? "bg-green-100 text-green-700"
                  : "bg-[#2d6a2d] text-white hover:bg-[#1e4f1e]"
            }`}
          >
            {product.product_quantity <= 0 ? (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Out of stock
              </>
            ) : added ? (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>

          <span className="text-xs font-medium text-stone-500">
            {viewers} people viewing
          </span>

          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
