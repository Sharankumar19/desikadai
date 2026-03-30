import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './components/ProductDetails';

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <CheckoutProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CheckoutProvider>
    </CartProvider>
  </BrowserRouter>
);

export default App;
