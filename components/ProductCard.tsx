
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group cursor-pointer block relative">
      <div className="relative aspect-square bg-gray-100 overflow-hidden mb-3 md:mb-4 rounded-md md:rounded-none">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 uppercase tracking-wider shadow-sm">New</span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-brand-highlight text-black text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 uppercase tracking-wider shadow-sm">Best Seller</span>
        )}
      </div>
      <div className="space-y-0.5 md:space-y-1">
        <h3 className="font-semibold text-brand-black text-sm md:text-base leading-tight group-hover:text-gray-600 transition-colors truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs md:text-sm truncate">{product.category} • {product.gender}</p>
        <p className="font-medium text-brand-black mt-1 text-sm md:text-base">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
