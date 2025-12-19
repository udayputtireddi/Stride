
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App.tsx';
import { MOCK_PRODUCTS } from '../constants';
import { Truck, ShieldCheck, Sparkles, Maximize2 } from 'lucide-react';

const SIZES = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleStylist } = useApp();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = product ? product.images : [];

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product?.id]);

  if (!product) {
    return <div className="p-20 text-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    navigate('/cart');
  };

  const currentImageSrc = images[selectedImageIndex] || images[0];
  const hasGallery = images.length > 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative shadow-sm group">
            <img 
              src={currentImageSrc} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
            
             {product.isNew && (
              <span className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-sm z-10">New Release</span>
            )}

            <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10">
                <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* Thumbnails Gallery */}
          {hasGallery && (
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative transition-all ${selectedImageIndex === idx ? 'ring-2 ring-brand-highlight ring-offset-2' : 'hover:opacity-80'}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col h-full">
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-start">
               <h1 className="text-2xl md:text-5xl font-black text-brand-black mb-2 tracking-tight leading-none">{product.name}</h1>
               <p className="text-xl md:text-2xl font-bold md:hidden">${product.price}</p>
            </div>
            
            <p className="text-sm md:text-xl font-medium text-gray-500 mb-4">{product.category}</p>
            <p className="hidden md:block text-2xl font-bold mb-6">${product.price}</p>
            
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6 md:mb-8 bg-gray-50 p-4 rounded-xl md:bg-transparent md:p-0">
                <h3 className="font-bold mb-2 text-xs md:text-sm uppercase tracking-wide">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm text-gray-600">
                    {product.features.map(f => <li key={f}>{f}</li>)}
                </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
               <h3 className="font-bold text-xs md:text-sm uppercase">Select Size</h3>
               <button className="text-gray-500 text-xs md:text-sm underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 md:py-3 rounded-lg border text-xs md:text-sm font-medium transition-all ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-200 text-gray-900 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 mt-auto pb-4 md:pb-0">
            <div className="flex gap-3">
                <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-4 md:py-5 rounded-full font-bold uppercase tracking-widest transition-all text-sm md:text-base ${
                    selectedSize 
                    ? 'bg-brand-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                >
                {selectedSize ? 'Add to Cart' : 'Select a Size'}
                </button>
            </div>
            
            <button 
                onClick={toggleStylist}
                className="w-full py-3 md:py-4 border border-gray-300 rounded-full font-bold uppercase tracking-widest hover:border-brand-highlight hover:text-brand-black transition-colors flex items-center justify-center gap-2 text-xs md:text-sm"
            >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-brand-highlight" /> 
                Ask AI About This Product
            </button>
          </div>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100 space-y-3 md:space-y-4">
             <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span className="text-xs md:text-sm font-medium text-gray-600">Free delivery on orders over $150</span>
             </div>
             <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span className="text-xs md:text-sm font-medium text-gray-600">Free returns within 30 days</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
