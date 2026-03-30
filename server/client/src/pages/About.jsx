import Boobalan from '../image/boobalan.jpeg';
import Arul from '../image/arul.jpg';

const TEAM = [
  { 
    name: 'Boobalan', 
    role: 'Founder', 
    emoji: Boobalan, 
    desc: '5+ years in horticulture. Started Plantify from her tiny apartment garden.' 
  },
  { 
    name: 'Arul Kumar', 
    role: 'Co-Founder', 
    emoji: Arul, 
    desc: 'Ensures every plant reaches you healthy, on time, and beautifully packaged.' 
  }
  // { 
  //   name: 'Sharan Kumar', 
  //   role: 'Full Stack Developer', 
  //   emoji: '💻', 
  //   desc: 'This website was designed and developed by Sharan Kumar.' 
  // },
];

const STATS = [
  { value: '5,000+', label: 'Happy Plant Parents' },
  { value: '150+', label: 'Plant Varieties' },
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
          Plantify was born from a simple idea — that plants have the power to transform spaces, improve wellbeing, and connect us with nature, even in the middle of a city.
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

    {/* Story */}
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-3xl font-bold text-stone-800 mb-5">How It All Started</h2>
          <p className="text-stone-500 leading-relaxed mb-4">
            In 2025, our founder Boobalan discovered that her overcrowded Chennai apartment felt instantly calmer after placing a few plants on the windowsill. She began gifting plants to neighbours, who started asking to buy more.
          </p>
          <p className="text-stone-500 leading-relaxed mb-4">
            What began as a hobby turned into Plantify — a curated online store that sources plants from trusted nurseries across South India, ensuring every plant is healthy, pest-free, and ready to thrive in your home.
          </p>
          <p className="text-stone-500 leading-relaxed">
            Today, we ship to homes across Tamil Nadu, Karnataka, and Andhra Pradesh, and we're growing every day (just like our plants).
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop" alt="Plants" className="rounded-2xl w-full h-40 object-cover" />
          <img src="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=300&h=300&fit=crop" alt="Pots" className="rounded-2xl w-full h-40 object-cover mt-6" />
          <img src="https://images.unsplash.com/photo-1585412459213-8fed31eca5b0?w=300&h=300&fit=crop" alt="Fiddle leaf" className="rounded-2xl w-full h-40 object-cover -mt-6" />
          <img src="https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=300&h=300&fit=crop" alt="Snake plant" className="rounded-2xl w-full h-40 object-cover" />
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
          { icon: '🌱', title: 'Sustainability', desc: 'All our plants are grown without harmful pesticides.' },
          { icon: '📦', title: 'Safe Packaging', desc: 'Plants are packed to survive transit without stress.' },
          { icon: '❤️', title: 'Plant Love', desc: 'Every plant is inspected before it leaves our nursery.' },
          { icon: '💬', title: 'Expert Support', desc: 'Got a plant problem? We\'re here to help, always.' },
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