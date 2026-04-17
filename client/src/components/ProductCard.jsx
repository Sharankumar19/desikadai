// src/components/ProductCard.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = cartItems.find((i) => i.id === product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const categoryColors = {
    "grow bag": "bg-forest-100 text-forest-700",
    outdoor: "bg-sky-100 text-sky-700",
    succulents: "bg-amber-100 text-amber-700",
    accessories: "bg-purple-100 text-purple-700",
    seeds: "bg-orange-100 text-orange-700",
  };

  return (
    <div
      onClick={handleCardClick}
      className="card group overflow-hidden animate-fade-in cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-96">
        <img
          // ✅ FIX: use first image from array
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop";
          }}
        />

        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
              categoryColors[product.category] || "bg-stone-100 text-stone-600"
            }`}
          >
            {product.category}
          </span>
        </div>

        {inCart && (
          <div className="absolute top-3 right-3 bg-moss text-white text-xs px-2 py-1 rounded-full font-medium">
            In cart ({inCart.quantity})
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-stone-800 mb-1 text-lg leading-tight">
          {product.name}
        </h3>

        <p className="text-stone-500 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-moss">
            ₹{product.price}
          </span>

          <p
            className={`px-2 py-1 text-sm font-semibold rounded ${
              product.product_quantity > 0
                ? "bg-forest-100 text-forest-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {product.product_quantity > 0
              ? `Stock: ${product.product_quantity}`
              : "no stock"}
          </p>

          {/* <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
              added
                ? "bg-forest-100 text-forest-700"
                : "bg-moss text-white hover:bg-leaf shadow-sm hover:shadow-md"
            }`}
          >
            {added ? "Added!" : "Add to Cart"}
          </button> */}
          <button
  onClick={handleAdd}
  disabled={product.product_quantity <= 0}
  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
    product.product_quantity <= 0
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : added
      ? "bg-forest-100 text-forest-700"
      : "bg-moss text-white hover:bg-leaf shadow-sm hover:shadow-md"
  }`}
>
  {product.product_quantity <= 0
    ? "Out of Stock"
    : added
    ? "Added!"
    : "Add to Cart"}
</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
