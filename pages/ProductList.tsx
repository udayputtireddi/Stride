
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Category, Activity, SearchFilters } from '../types';

const ProductList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Parse initial filters from navigation state
  const originalQuery = location.state?.originalQuery;

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedActivity, setSelectedActivity] = useState<string>('All');
  const [featured, setFeatured] = useState<'new' | 'bestseller' | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  // Initialize state based on location.state whenever it changes
  useEffect(() => {
    if (location.state?.filters) {
      const f = location.state.filters as SearchFilters;
      setSelectedCategory(f.category && f.category !== 'Any' ? f.category : 'All');
      setSelectedActivity(f.activity && f.activity !== 'Any' ? f.activity : 'All');
      setFeatured(f.featured || null);
      if (f.maxPrice) setMaxPrice(f.maxPrice);
    } else {
      // Reset if no state provided
      setSelectedCategory('All');
      setSelectedActivity('All');
      setFeatured(null);
      setMaxPrice(500);
    }
  }, [location.state]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const activityMatch = selectedActivity === 'All' || product.activity === selectedActivity;
      const priceMatch = product.price <= maxPrice;
      const featuredMatch = !featured 
        ? true 
        : featured === 'new' ? product.isNew : product.isBestSeller;

      return categoryMatch && activityMatch && priceMatch && featuredMatch;
    });
  }, [selectedCategory, selectedActivity, maxPrice, featured]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedActivity('All');
    setFeatured(null);
    setMaxPrice(500);
    navigate(location.pathname, { replace: true, state: {} });
  };

  const handleActivityChange = (activity: string) => {
      setSelectedActivity(activity);
  }

  const getPageTitle = () => {
      if (originalQuery) return originalQuery;
      if (featured === 'new') return "New Arrivals";
      if (featured === 'bestseller') return "Best Sellers";
      if (selectedActivity !== 'All') return `${selectedActivity} Gear`;
      return "All Gear";
  };

  return (
    <div className="max-w-7xl mx-auto px-0 md:px-6 py-0 md:py-8">
      {/* Mobile Nike-Style Horizontal Scroll Categories */}
      <div className="md:hidden sticky top-16 bg-white z-20 border-b border-gray-100 px-4 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-2">
         <button 
            onClick={() => handleActivityChange('All')}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${selectedActivity === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
         >
            All Sports
         </button>
         {Object.values(Activity).map(a => (
            <button 
                key={a}
                onClick={() => handleActivityChange(a)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${selectedActivity === a ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
            >
                {a}
            </button>
         ))}
      </div>

      <div className="px-4 py-4 md:px-0">
        {/* Context Header */}
        <div className="flex justify-between items-end mb-4 md:mb-8">
            <div>
                 <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    {getPageTitle()}
                 </h1>
                 <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} Items</p>
            </div>
            
            {/* Mobile Filter Toggle */}
             <button 
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-xs font-bold uppercase"
            >
                Filter <Filter className="w-3 h-3" />
            </button>
        </div>
      

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Filters - Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-24 h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl">Filters</h2>
            <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-black">Reset</button>
          </div>
          
          <div className="space-y-8">
             {/* Featured Sort */}
             {(featured) && (
                 <div className="pb-6 border-b border-gray-100">
                     <span className="bg-brand-highlight px-2 py-1 text-xs font-bold uppercase tracking-wider">
                         Showing: {featured === 'new' ? 'New Arrivals' : 'Best Sellers'}
                     </span>
                 </div>
             )}

             {/* Activity (Desktop) */}
             <div>
              <h3 className="font-bold mb-3 text-sm uppercase">Sport</h3>
              <div className="space-y-2">
                {['All', ...Object.values(Activity)].map(a => (
                  <label key={a} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="activity" 
                      checked={selectedActivity === a}
                      onChange={() => setSelectedActivity(a)}
                      className="accent-black"
                    />
                    <span className={`text-sm ${selectedActivity === a ? 'font-bold' : 'text-gray-600 group-hover:text-black'}`}>{a}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="font-bold mb-3 text-sm uppercase">Equipment Type</h3>
              <div className="space-y-2">
                {['All', ...Object.values(Category)].map(c => (
                  <label key={c} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === c}
                      onChange={() => setSelectedCategory(c)}
                      className="accent-black"
                    />
                    <span className={`text-sm ${selectedCategory === c ? 'font-bold' : 'text-gray-600 group-hover:text-black'}`}>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-bold mb-3 text-sm uppercase">Max Price: ${maxPrice}</h3>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="25" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 md:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-400 font-medium">No gear matches your criteria.</p>
                <button onClick={clearFilters} className="mt-4 text-brand-black font-bold underline">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-[fadeInUp_0.3s_ease-out]">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold uppercase tracking-tight">Filter Gear</h2>
            <button onClick={() => setShowMobileFilters(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
           <div className="flex-grow overflow-y-auto p-6 space-y-8">
            {/* Category */}
            <div>
              <h3 className="font-bold mb-3 text-sm uppercase">Equipment</h3>
              <div className="flex flex-wrap gap-2">
                 {['All', ...Object.values(Category)].map(c => (
                  <button 
                    key={c} 
                    onClick={() => setSelectedCategory(c)}
                    className={`px-4 py-2 rounded-full border text-xs font-bold uppercase ${selectedCategory === c ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            {/* Price */}
             <div>
              <h3 className="font-bold mb-3 text-sm uppercase">Price limit: ${maxPrice}</h3>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="25" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-100">
             <button 
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-wide"
            >
              View {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
