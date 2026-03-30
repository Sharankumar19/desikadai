const BLOGS = [
  {
    id: 1,
    title: 'Best Grow Bags for Home Gardening in 2026',
    category: 'Gardening',
    date: 'March 20, 2026',
    readTime: '4 min read',
    excerpt: 'Looking to start a terrace garden? Discover the best grow bags for vegetables, flowers, and fruits. Durable, reusable, and perfect for small spaces.',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=600&h=400&fit=crop',
    emoji: '🪴',
  },
  {
    id: 2,
    title: 'Top Plant Accessories Every Beginner Needs',
    category: 'Accessories',
    date: 'March 18, 2026',
    readTime: '5 min read',
    excerpt: 'From watering cans to soil mix, explore must-have gardening tools that make plant care easier and more effective.',
    image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=600&h=400&fit=crop',
    emoji: '🛠️',
  },
  {
    id: 3,
    title: 'How to Use Washing Machine Drum Cleaner Properly',
    category: 'Home Care',
    date: 'March 10, 2026',
    readTime: '3 min read',
    excerpt: 'Keep your washing machine fresh and odor-free. Learn how to use drum cleaning powder and maintain hygiene at home.',
    image: 'https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&h=400&fit=crop',
    emoji: '🧼',
  },
  {
    id: 4,
    title: 'Natural Skincare with Aloe Vera & Plant-Based Products',
    category: 'Skincare',
    date: 'March 5, 2026',
    readTime: '6 min read',
    excerpt: 'Discover how plant-based skincare products like aloe vera can improve your skin naturally without harmful chemicals.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop',
    emoji: '✨',
  },
  {
    id: 5,
    title: 'Indoor Plants That Improve Air Quality',
    category: 'Plants',
    date: 'February 28, 2026',
    readTime: '4 min read',
    excerpt: 'Bring freshness into your home with indoor plants that purify air and create a peaceful environment.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=400&fit=crop',
    emoji: '🌿',
  },
  {
    id: 6,
    title: 'Terrace Gardening: Start Your Own Organic Garden',
    category: 'Gardening',
    date: 'February 20, 2026',
    readTime: '7 min read',
    excerpt: 'Learn how to grow vegetables at home using grow bags, organic soil, and simple techniques.',
    image: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=600&h=400&fit=crop',
    emoji: '🏡',
  },
];

const categoryColors = {
  'Gardening': 'bg-[#F5E6D3] text-[#8B6F47]',
  'Accessories': 'bg-[#FAF3E0] text-[#A67C52]',
  'Home Care': 'bg-[#FFF8F0] text-[#B08968]',
  'Skincare': 'bg-[#FDEFE3] text-[#C08457]',
  'Plants': 'bg-[#F7EBDD] text-[#9C7B5B]',
};

const Blog = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Header */}
    <div className="text-center mb-12">
      <p className="text-sage text-sm font-medium tracking-widest uppercase mb-3">🌱 Plant Knowledge</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mb-4">The Green Journal</h1>
      <p className="text-stone-500 max-w-xl mx-auto">Tips, guides, and stories about growing your green space — from beginner to expert.</p>
    </div>

    {/* Featured Post */}
    <div className="card overflow-hidden mb-10 group">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="overflow-hidden h-64 md:h-auto">
          <img src={BLOGS[0].image} alt={BLOGS[0].title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryColors[BLOGS[0].category]}`}>{BLOGS[0].category}</span>
            <span className="text-xs text-stone-400">Featured</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-800 mb-4 leading-tight">{BLOGS[0].title}</h2>
          <p className="text-stone-500 leading-relaxed mb-6">{BLOGS[0].excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-stone-400">{BLOGS[0].date} · {BLOGS[0].readTime}</div>
            <button className="btn-primary text-sm px-5 py-2">Read More →</button>
          </div>
        </div>
      </div>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {BLOGS.slice(1).map((post) => (
        <div key={post.id} className="card overflow-hidden group cursor-pointer">
          <div className="overflow-hidden h-48">
            <img src={post.image} alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-stone-100 text-stone-600'}`}>
                {post.category}
              </span>
            </div>
            <h3 className="font-display font-bold text-stone-800 mb-2 leading-snug group-hover:text-moss transition-colors">
              {post.emoji} {post.title}
            </h3>
            <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Blog;
