import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const [mainImage, setMainImage] = useState('');

  // ✅ FIX: use id
  const inCart = cartItems.find((i) => i.id === Number(id));
 
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://desikadai-backend.onrender.com/api/products/${id}`);
        const data = res.data.data;

        setProduct(data);
        setMainImage(data.images?.[0]);
      } catch (err) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <Spinner text="Loading product..." />;
  if (error) return <div className="text-center text-red-500 py-16">{error}</div>;
  if (!product) return <div className="text-center py-16">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Images */}
        <div className="space-y-4">
          <Zoom>
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg cursor-zoom-in"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop';
              }}
            />
          </Zoom>

          <div className="flex gap-2 overflow-x-auto">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                  mainImage === img
                    ? 'border-moss border-2'
                    : 'border-stone-200'
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-4">
            {product.name}
          </h1>

          <p className="text-stone-500 mb-4">{product.description}</p>

          <p className="text-xl font-bold text-moss mb-4">
            ₹{product.price}
          </p>

          <p className="mb-4">
            Category:{' '}
            <span className="font-medium capitalize">
              {product.category}
            </span>
          </p>

          <button
            onClick={handleAdd}
            className={`px-6 py-3 rounded-full text-white font-medium transition-all duration-200 ${
              added
                ? 'bg-forest-100 text-forest-700'
                : 'bg-moss hover:bg-leaf shadow-sm hover:shadow-md'
            }`}
          >
            {added
              ? 'Added!'
              : inCart
              ? `In Cart (${inCart.quantity})`
              : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;