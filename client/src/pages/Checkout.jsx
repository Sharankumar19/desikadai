import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  // const [setLoading]=useState(false);
  const { setCheckoutData } = useCheckout();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [errors, setErrors] = useState({});

  const deliveryFee = cartTotal >= 999 ? 0 : 20;
  const grandTotal = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-7xl mb-6">🛒</p>
        <h2 className="font-display text-3xl font-bold text-stone-700 mb-3">Your cart is empty</h2>
        <Link to="/" className="btn-primary inline-block mt-4">Browse Plants</Link>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = 'Enter your full name (min 2 characters)';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim())) newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.address.trim() || form.address.trim().length < 10) newErrors.address = 'Enter a complete delivery address (min 10 characters)';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ Step 1: Validation (OLD CODE)
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  // ✅ Step 2: Prepare order details
  const orderDetails = cartItems.map(item => 
    `• ${item.name} - Qty: ${item.quantity} - ₹${item.price}`
  ).join('\n');

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Step 3: Send Email (NEW CODE)
  emailjs.send(
    'service_s9u9chn',
    'template_7dxs87j', // ⚠️ check spelling (you wrote "emplate" before ❌)
    {
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      order_id: Date.now(),
      order_details: orderDetails,
      total: total
    },
    'bagNmPZDHo4kfgGdj'
  )
  .then(() => {
    console.log("Email sent ✅");

    // ✅ Step 4: Continue OLD FLOW (IMPORTANT)
    setCheckoutData({
      customer: form,
      items: cartItems,
      totalAmount: total
    });

    navigate('/payment'); // 👈 old behavior restored
  })
  .catch((err) => {
    console.error(err);
    alert("Failed to send email ❌");
  });
};

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-stone-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            <h2 className="font-display text-xl font-semibold text-stone-800 mb-6 flex items-center gap-2">
              <span className="w-7 h-7 bg-moss text-white rounded-full flex items-center justify-center text-sm">1</span>
              Delivery Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ravi Kumar"
                  className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-300' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone Number *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="8807172561"
                    maxLength={10}
                    className={`input-field pl-12 ${errors.phone ? 'border-red-300 focus:ring-red-300' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ravi@example.com"
                  className={`input-field ${errors.email ? 'border-red-300 focus:ring-red-300' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Delivery Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Door no, Street, Area, City, State, PIN"
                  rows={3}
                  className={`input-field resize-none ${errors.address ? 'border-red-300 focus:ring-red-300' : ''}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-base mt-2">
                Continue to Payment →
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="card p-6 sticky top-24">
            <h2 className="font-display text-xl font-semibold text-stone-800 mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-3 items-center">
                  <img src={item.images} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop'; }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-700 truncate">{item.name}</p>
                    <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-stone-700">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-100 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-forest-600 font-medium' : ''}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-800 text-base pt-1 border-t border-stone-100">
                <span>Total</span><span className="text-moss">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
