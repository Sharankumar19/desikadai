import { useEffect, useState } from "react";

const CITIES = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Erode",
  "Tiruppur",
  "Vellore",
  "Thoothukudi",
  "Tirunelveli",
  "Dindigul",
  "Thanjavur",
  "Kanchipuram",
  "Cuddalore",
  "Villupuram",
  "Nagapattinam",
  "Mayiladuthurai",
  "Karur",
  "Namakkal",
  "Krishnagiri",
  "Dharmapuri",
  "Ranipet",
  "Tirupathur",
  "Kallakurichi",
  "Ariyalur",
  "Perambalur",
  "Pudukkottai",
  "Sivagangai",
  "Ramanathapuram",
  "Virudhunagar",
  "Tenkasi",
  "Kanyakumari",
  "Nilgiris",
  "Theni",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Chennai",
  "Villupuram",
  "Cuddalore",
  "Coimbatore",
  "Madurai",
  "Salem",
  "Erode",
  "Tiruppur",
  "Trichy",
  "Thanjavur",
  "Vellore",
  "Tirunelveli",
  "Thoothukudi",
  "Kanyakumari",
  "Namakkal",
  "Karur",
  "Dharmapuri",
  "Krishnagiri",
  "Nagapattinam",
  "Mayiladuthurai",
  "Dindigul",
  "Theni",
  "Tenkasi",
  "Virudhunagar",
  "Sivagangai",
  "Ramanathapuram",
];

const PRODUCTS = [
  "Grow Bags",
  "Black Chilly Seeds",
  "Rabbit Manure",
  "Goat Manure",
  "IFB Descale Powder",
  "Bird's Eye Chilli Seeds",
  "Natural Pest Control Solution",
  "Cow Manure",
  "Fish Amino Acid",
];

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

export default function LiveVisitors() {
  const [notification, setNotification] = useState(null);

  const addNotification = () => {
    const city = CITIES[rand(0, CITIES.length - 1)];
    const product = PRODUCTS[rand(0, PRODUCTS.length - 1)];
    const mins = rand(1, 15);

    setNotification({
      id: Date.now(),
      city,
      product,
      mins,
    });
  };

  useEffect(() => {
    addNotification();

    const interval = setInterval(() => {
      addNotification();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 animate-slide-up">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-xl px-4 py-3 flex items-center max-w-sm">
        
        {/* Order Icon */}
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-lg flex-shrink-0">
          🎉
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm text-stone-700 leading-snug">
            <span className="font-semibold text-stone-900">
              {notification.city}
            </span>{" "}
            ordered{" "}
            <span className="font-semibold text-green-700">
              {notification.product}
            </span>
          </p>

          <p className="text-xs text-stone-400 mt-1">
            {notification.mins} min ago
          </p>
        </div>

        {/* Live Pulse */}
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
      </div>
    </div>
  );
}