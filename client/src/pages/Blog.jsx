const BLOGS = [
  {
    id: 1,
    title: 'Best Grow Bags for Home Gardening in 2026',
    category: 'Gardening',
    date: 'March 20, 2026',
    readTime: '4 min read',
    excerpt: 'Looking to start a terrace garden? Discover the best grow bags for vegetables, flowers, and fruits. Durable, reusable, and perfect for small spaces.',
    image: 'https://res.cloudinary.com/dyhe8bh7q/image/upload/v1774885733/valeriia-miller-_42NKYROG7g-unsplash_bloqu8.jpg',
    emoji: '🪴',
  }
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
            <span className="text-xs bg-red-500 px-3 py-1  text-white rounded-full animate-pulse">comming soon</span>
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
      {/* {BLOGS?.slice(1).map((post) => (
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
      ))} */}
    </div>
  </div>
);

export default Blog;
