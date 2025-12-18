
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, Sparkles } from 'lucide-react';
import { useApp } from '../App.tsx';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { cart, toggleStylist } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-40">
      <div className="bg-black/75 text-white rounded-[32px] shadow-2xl px-6 py-4 flex justify-between items-center backdrop-blur-xl border border-white/10 transition-all duration-300">
        <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-white' : 'text-gray-400'}`}>
          <Home className="w-6 h-6" strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        
        <Link to="/shop" className={`flex flex-col items-center gap-1 ${isActive('/shop') ? 'text-white' : 'text-gray-400'}`}>
          <Search className="w-6 h-6" strokeWidth={isActive('/shop') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Shop</span>
        </Link>

        {/* StrideAI - Center Feature */}
        <button onClick={toggleStylist} className="flex flex-col items-center gap-1 text-brand-highlight">
          <Sparkles className="w-6 h-6 fill-brand-highlight" />
          <span className="text-[10px] font-bold">StrideAI</span>
        </button>

        <Link to="/cart" className={`relative flex flex-col items-center gap-1 ${isActive('/cart') ? 'text-white' : 'text-gray-400'}`}>
          <div className="relative">
            <ShoppingBag className="w-6 h-6" strokeWidth={isActive('/cart') ? 2.5 : 2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-highlight text-black text-[9px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Bag</span>
        </Link>

        <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-white' : 'text-gray-400'}`}>
          <User className="w-6 h-6" strokeWidth={isActive('/profile') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
