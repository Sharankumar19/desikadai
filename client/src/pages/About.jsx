import Boobalan from '../image/boobalan.jpeg';
import Arul from '../image/arul.jpg';

const REVIEWS = [
  {
    name: "Ramesh Kumar",
    rating: 5,
    review: "Excellent quality grow bags! Very strong and perfect for terrace gardening.",
  },
  {
    name: "Priya S",
    rating: 5,
    review: "Fast delivery and good packaging. Seeds germinated quickly. Highly recommended!",
  },
  {
    name: "Arun V",
    rating: 4,
    review: "Affordable prices and good customer support. Will buy again.",
  },
];

const TEAM = [
  { 
    name: 'Boobalan', 
    role: 'Founder', 
    emoji: Boobalan, 
    desc: '5+ years of experience. Started from a small setup, supplying quality grow bags, fertilizers, and seeds.' 
  },
  { 
    name: 'Arul Kumar', 
    role: 'Co-Founder', 
    emoji: Arul, 
    desc: 'We ensure every product is carefully packed and delivered on time, maintaining the highest quality standards.' 
  }
];

const STATS = [
  { value: '5,000+', label: 'Happy Family`s' },
  { value: '150+', label: 'Products' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '3 Years', label: 'In Business' },
];

const About = () => (
  <div>
    {/* Hero */}
    <section className="bg-gradient-to-br from-forest-50 to-sage/10 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sage text-sm font-medium tracking-widest uppercase mb-4">🌿 Our Story</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-stone-800 mb-6 leading-tight">
          We Believe Every Home <br />
          <span className="text-moss italic">Deserves Greenery</span>
        </h1>
        <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
          Desikadai was born from a simple idea — that plants have the power to transform spaces, improve wellbeing, and connect us with nature, even in the middle of a city.
        </p>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-moss py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-3xl font-bold mb-1">{value}</p>
              <p className="text-forest-200 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    
      {/* Customer Reviews */}
<section className="bg-forest-50 py-16">
  <div className="max-w-5xl mx-auto px-4">
    <h2 className="font-display text-3xl font-bold text-stone-800 text-center mb-10">
      Customer Reviews ⭐
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {REVIEWS.map((r, index) => (
        <div key={index} className="card p-6">
          
          {/* Stars */}
          <div className="text-yellow-400 mb-3">
            {"⭐".repeat(r.rating)}
          </div>

          {/* Review */}
          <p className="text-stone-500 text-sm mb-4 leading-relaxed">
            "{r.review}"
          </p>

          {/* Name */}
          <p className="font-semibold text-stone-700 text-sm">
            – {r.name}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

    {/* Story */}
    <section className="max-w-4xl mx-auto px-4 py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="font-display text-3xl font-bold text-stone-800 mb-5">
        How It All Started
      </h2>

      <p className="text-stone-500 leading-relaxed mb-4">
        In 2025, our founder Boobalan started with a simple mission — to make gardening easy and accessible for everyone. What began as a small local business selling grow bags, fertilizers, and seeds quickly gained the trust of home gardeners.
      </p>

      <p className="text-stone-500 leading-relaxed mb-4">
        With a focus on quality and affordability, we carefully source durable grow bags, nutrient-rich fertilizers, and high-quality seeds that help plants grow healthier and stronger.
      </p>

      <p className="text-stone-500 leading-relaxed">
        Today, we proudly serve customers across South India, supporting thousands of people in building their own gardens — from balconies to backyards.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4">
     <img 
  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300&h=300&fit=crop" 
  alt="Farming" 
  className="rounded-2xl w-full h-40 object-cover -mt-6" 
/>
      <img src="https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=300&h=300&fit=crop" alt="Grow bags" className="rounded-2xl w-full h-40 object-cover" />
    </div>
  </div>
</section>

    {/* Team */}
    <section className="bg-forest-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-stone-800 text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TEAM.map(({ name, role, emoji, desc }) => (
            <div key={name} className="card p-6 text-center">
              {/* Circle Avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white shadow-md">
            
                  <img src={emoji} alt={name} className="w-full h-full object-cover" />
           
              </div>
              <h3 className="font-display font-bold text-stone-800 mb-1">{name}</h3>
              <p className="text-sage text-sm font-medium mb-3">{role}</p>
              <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-stone-800 text-center mb-10">Our Values</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
  { 
    icon: '🌱', 
    title: 'Quality Products', 
    desc: 'We provide durable grow bags, nutrient-rich fertilizers, and high-quality seeds for better results.' 
  },
  { 
    icon: '📦', 
    title: 'Safe Packaging', 
    desc: 'All products are securely packed to ensure safe and damage-free delivery.' 
  },
  { 
    icon: '✅', 
    title: 'Trusted Quality', 
    desc: 'Every product is carefully checked to maintain quality and reliability.' 
  },
  { 
    icon: '💬', 
    title: 'Customer Support', 
    desc: 'Need help? Our team is always ready to support your gardening needs.' 
  }
        ].map(({ icon, title, desc }) => (
          <div key={title} className="text-center p-5">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-semibold text-stone-700 mb-2">{title}</h3>
            <p className="text-stone-400 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default About;