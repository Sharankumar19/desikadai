import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems?.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-7xl mb-6">🛒</p>
        <h2 className="font-display text-3xl font-bold text-stone-700 mb-3">Your cart is empty</h2>
        <p className="text-stone-400 mb-8">Looks like you haven't added any plants yet!</p>
        <Link to="/" className="btn-primary inline-block">Browse Plants</Link>
      </div>
    );
  }

  const deliveryFee = cartTotal >= 999 ? 0 : 0;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-800">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="card p-4 flex gap-4 animate-slide-up">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop'; }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-stone-800 mb-0.5 truncate">{item.name}</h3>
                <p className="text-moss font-bold text-lg">₹{item.price}</p>
                <div className="flex items-center justify-between mt-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-forest-50 rounded-full px-1 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-forest-100 transition-colors text-moss font-bold"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold text-stone-700 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-forest-100 transition-colors text-moss font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-stone-500 text-sm font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-300 hover:text-red-500 transition-colors p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-stone-800 mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-forest-600 font-medium' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-stone-400">Add ₹{(999 - cartTotal).toFixed(2)} more for free delivery</p>
              )}
              <div className="border-t border-stone-100 pt-3 flex justify-between font-bold text-lg text-stone-800">
                <span>Total</span>
                <span className="text-moss">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 block text-center btn-primary w-full py-3"
            >
              Proceed to Checkout →
            </Link>
            <Link to="/" className="mt-3 block text-center text-sm text-stone-400 hover:text-moss transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
