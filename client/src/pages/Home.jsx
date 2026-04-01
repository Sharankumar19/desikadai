import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const CATEGORIES = ['all', 'grow bag', 'Laundry Essentials', 'fertilizers', 'accessories', 'seeds'];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (debouncedSearch) params.search = debouncedSearch;
        if (category !== 'all') params.category = category;
        const res = await axios.get('/api/products', { params });
        setProducts(res.data.data);
      } catch (err) {
        setError('Failed to load products. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    setCurrentPage(1); // Reset to first page on search/category change
  }, [debouncedSearch, category]);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-moss via-leaf to-sage overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🌿</div>
          <div className="absolute top-20 right-20 text-7xl">🌱</div>
          <div className="absolute bottom-10 left-1/3 text-8xl">🍃</div>
          <div className="absolute bottom-5 right-10 text-6xl">🌾</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-forest-200 text-sm font-medium tracking-widest uppercase mb-4">🌱 Welcome to Desikadai</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Bring Nature <br />
              <span className="italic text-forest-200">Into Your Home</span>
            </h1>
            <p className="text-forest-100 text-lg leading-relaxed mb-8 max-w-lg">
              Discover our handpicked collection of beautiful plants, succulents, and accessories. Free delivery on orders.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#products" className="bg-white text-moss px-6 py-3 rounded-full font-semibold hover:bg-forest-50 transition-all shadow-md hover:shadow-lg active:scale-95">
                Shop Now
              </a>
              <a href="#products" className="border-2 border-white/50 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all active:scale-95">
                Explore Plants
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-forest-50 border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm text-stone-600">
            {[
              ['🚚', 'Free delivery above ₹999'],
              ['🌿', '100% naturally grown'],
              ['📦', 'Safe & secure packaging'],
              ['↩️', '7-day easy returns'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2">
                <span>{icon}</span>
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-800 mb-3">Our Green Collection</h2>
          <p className="text-stone-500 max-w-md mx-auto">Every plant is lovingly selected and ready to thrive in your space.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                  category === cat
                    ? 'bg-moss text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-600 hover:border-sage hover:text-moss'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <Spinner text="Loading plants..." />
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🌵</p>
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-stone-400 text-sm mt-2">Check your network or backend connection.</p>
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-stone-600 font-medium">No plants found</p>
            <p className="text-stone-400 text-sm mt-1">Try a different search or category.</p>
          </div>
        ) : (
          <>
            <p className="text-stone-400 text-sm mb-6">{products.length} products found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded-md bg-white border border-stone-200 text-stone-600 hover:bg-moss hover:text-white"
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === i + 1
                      ? 'bg-moss text-white'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-moss hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 rounded-md bg-white border border-stone-200 text-stone-600 hover:bg-moss hover:text-white"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;