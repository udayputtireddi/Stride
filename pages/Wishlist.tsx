
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../App.tsx';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const { wishlist } = useApp();

  const wishlistedProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => wishlist.includes(product.id));
  }, [wishlist]);

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
            <div className="p-6 bg-gray-50 rounded-full">
                <Heart className="w-12 h-12 text-gray-300" />
            </div>
        </div>
        <h2 className="text-3xl font-black mb-4">FAVORITES IS EMPTY</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Items added to your favorites will be saved here so you can get back to them easily.</p>
        <Link to="/shop" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold uppercase hover:bg-gray-800 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-end gap-3 mb-8 md:mb-12">
        <h1 className="text-3xl font-black uppercase">Favorites</h1>
        <span className="text-gray-500 mb-1.5 font-medium">({wishlistedProducts.length} Items)</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6">
        {wishlistedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
