// LiveVisitors.jsx
import { useEffect, useState } from 'react';

const CITIES = ["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad","Pune",
  "Kolkata","Jaipur","Ahmedabad","Surat","Kochi","Indore","Nagpur","Lucknow","Vadodara"];

const EVENTS = [
  { icon: "👁", label: "viewed this product", type: "view" },
  { icon: "🛒", label: "added to cart", type: "cart" },
  { icon: "♡", label: "saved to wishlist", type: "wish" },
  { icon: "✓", label: "placed an order", type: "order" },
];

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const timeAgo = (s) => s < 60 ? `${s}s ago` : `${Math.floor(s / 60)}m ago`;

export default function LiveVisitors() {
  const [viewers, setViewers] = useState(rand(12, 26));
  const [sold, setSold] = useState(rand(10, 18));
  const [carts, setCarts] = useState(rand(18, 32));
  const [lastOrder, setLastOrder] = useState(`${rand(2, 8)}m ago`);
  const [feed, setFeed] = useState([]);

  const addRow = () => {
    const ev = EVENTS[rand(0, EVENTS.length - 1)];
    const city = CITIES[rand(0, CITIES.length - 1)];
    const secs = rand(4, 55);

    setFeed(prev => [{ id: Date.now(), ...ev, city, secs }, ...prev].slice(0, 4));
    setViewers(v => Math.max(6, v + (Math.random() > 0.5 ? 1 : -1)));
    if (ev.type === 'cart') setCarts(c => c + 1);
    if (ev.type === 'order') { setSold(s => s + 1); setLastOrder('just now'); }
  };

  useEffect(() => {
    addRow(); addRow(); addRow();
    const t = setInterval(addRow, 4200);
    return () => clearInterval(t);
  }, []);

  return (
  <div className="max-w-sm space-y-4">
  {/* Live Visitors */}
 <div className="flex items-center justify-between rounded-xl px-4 py-3">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
      👁️
    </div>

    <div>
      <p className="text-xs text-stone-500">Currently Viewing</p>
      <p className="text-xl font-bold text-stone-900">
        {viewers}
      </p>
    </div>
  </div>

  <div className="flex items-center gap-2">
    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
    <span className="text-sm font-medium text-green-700">
      Live
    </span>
  </div>
</div>

  {/* Quick Stats Pills */}
  <div className="flex flex-wrap gap-2">
    <div className="bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm font-medium">
      🛍 {sold} Sold Today
    </div>

    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm font-medium">
      🛒 {carts} In Carts
    </div>

    <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm font-medium">
      ⏱ {lastOrder}
    </div>
  </div>


</div>
  );
}