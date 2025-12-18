import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import AIStylist from './components/AIStylist';
import { Product, CartItem } from './types';

// Global Context
interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string) => void;
  isStylistOpen: boolean;
  toggleStylist: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isStylistOpen, setIsStylistOpen] = useState(false);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const toggleStylist = () => setIsStylistOpen(!isStylistOpen);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, isStylistOpen, toggleStylist, wishlist, toggleWishlist }}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-brand-black flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow pt-16 pb-24 md:pb-0"> {/* Added padding bottom for mobile nav */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <AIStylist isOpen={isStylistOpen} onClose={() => setIsStylistOpen(false)} />
          <BottomNav />

          <footer className="bg-brand-black text-white py-12 px-6 hidden md:block">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4 tracking-tighter">STRIDE.</h3>
                <p className="text-gray-400 text-sm">Elevating human potential through AI-driven gear selection.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Shop</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>New Arrivals</li>
                  <li>Best Sellers</li>
                  <li>Release Dates</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Support</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Help Center</li>
                  <li>Returns</li>
                  <li>Payment Options</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Connect</h4>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
              <p>© 2024 Stride AI, Inc. All Rights Reserved.</p>
              <div className="space-x-4">
                <span>Privacy Policy</span>
                <span>Terms of Use</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;