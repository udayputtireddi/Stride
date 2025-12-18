
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Activity } from '../types';

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop", // Soccer
    subtitle: "Professional Grade",
    title: "GEAR UP\nFOR VICTORY.",
    description: "Elite equipment for the pitch.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop", // Cricket
    subtitle: "World Class",
    title: "MASTER\nYOUR STROKE.",
    description: "Premium English Willow bats.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200&auto=format&fit=crop", // Tennis
    subtitle: "Grand Slam Ready",
    title: "SERVE\nWITH POWER.",
    description: "Precision engineered rackets.",
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4); // 4 items for grid
  const newArrivals = MOCK_PRODUCTS.slice(2, 6);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleShopBySport = (sport: Activity) => {
    navigate('/shop', { state: { filters: { activity: sport } } });
  };

  return (
    <div className="w-full pb-10">
      {/* Hero Section - Tall on Mobile, Standard on Desktop */}
      <section className="relative w-full h-[75vh] md:h-[80vh] bg-gray-900 overflow-hidden mb-8 md:mb-12">
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.subtitle} 
              className="w-full h-full object-cover opacity-80"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 w-full p-6 pb-12 md:p-16 z-10 flex flex-col items-start max-w-7xl mx-auto">
           <span className="text-brand-highlight text-xs font-bold tracking-widest uppercase mb-2 animate-[fadeInUp_0.8s_ease-out]">
              {HERO_SLIDES[currentSlide].subtitle}
           </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-4 leading-[0.9] drop-shadow-xl whitespace-pre-line animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            {HERO_SLIDES[currentSlide].title}
          </h1>
          <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-xs md:max-w-md font-medium drop-shadow-md animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            {HERO_SLIDES[currentSlide].description}
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors text-sm animate-[fadeInUp_0.8s_ease-out_0.6s_both]"
          >
            Explore
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        {/* Section: New This Week */}
        <section className="px-4 md:px-6 mb-12 md:mb-16">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight">New This Week</h2>
            <Link to="/shop" className="hidden md:block text-sm font-bold border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">Shop All New</Link>
          </div>
          
          {/* Mobile: Horizontal Scroll | Desktop: Grid */}
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
            {newArrivals.map(product => (
              <div key={product.id} className="min-w-[85%] md:min-w-0 snap-center">
                 <div className="aspect-[4/5] bg-gray-100 mb-3 overflow-hidden relative group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                     <img src={product.images[0]} className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-500" alt={product.name} />
                     {product.isNew && <span className="absolute top-3 left-3 bg-white text-xs font-bold px-2 py-1 uppercase tracking-wider">New</span>}
                 </div>
                 <h3 className="font-bold text-sm md:text-base leading-tight mb-1">{product.name}</h3>
                 <p className="text-gray-500 text-xs md:text-sm mb-2">{product.category}</p>
                 <span className="text-xs font-bold underline md:hidden">Shop Now</span>
                 <span className="hidden md:block text-sm font-medium">${product.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Gear Up (Collections) */}
        <section className="px-4 md:px-6 mb-12 md:mb-16">
           <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">Gear Up</h2>
           {/* Mobile: Horizontal Scroll | Desktop: Grid */}
           <div className="flex overflow-x-auto gap-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:mx-0 md:px-0">
              {/* Card 1 */}
              <div className="min-w-[80%] md:min-w-0 snap-center cursor-pointer group relative" onClick={() => handleShopBySport(Activity.CRICKET)}>
                  <div className="aspect-[3/4] relative overflow-hidden mb-3">
                     <img src="https://images.unsplash.com/photo-1593341646261-12c82f05eb4d?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                     <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                         <h3 className="text-white font-bold text-xl md:text-2xl uppercase italic tracking-tighter">Cricket<br/>Collection</h3>
                         <span className="inline-block mt-2 text-white text-xs font-bold border-b border-white pb-0.5">Shop Now</span>
                     </div>
                  </div>
              </div>
               {/* Card 2 */}
              <div className="min-w-[80%] md:min-w-0 snap-center cursor-pointer group relative" onClick={() => handleShopBySport(Activity.SOCCER)}>
                  <div className="aspect-[3/4] relative overflow-hidden mb-3">
                     <img src="https://images.unsplash.com/photo-1518605348400-437731db4857?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                     <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                         <h3 className="text-white font-bold text-xl md:text-2xl uppercase italic tracking-tighter">Football<br/>Essentials</h3>
                         <span className="inline-block mt-2 text-white text-xs font-bold border-b border-white pb-0.5">Shop Now</span>
                     </div>
                  </div>
              </div>
               {/* Card 3 */}
              <div className="min-w-[80%] md:min-w-0 snap-center cursor-pointer group relative" onClick={() => handleShopBySport(Activity.TENNIS)}>
                  <div className="aspect-[3/4] relative overflow-hidden mb-3">
                     <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                         <h3 className="text-white font-bold text-xl md:text-2xl uppercase italic tracking-tighter">Tennis<br/>Pro Gear</h3>
                         <span className="inline-block mt-2 text-white text-xs font-bold border-b border-white pb-0.5">Shop Now</span>
                     </div>
                  </div>
              </div>
           </div>
        </section>

        {/* Featured Products Grid */}
        <section className="px-4 md:px-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight">Best Sellers</h2>
            <Link to="/shop" className="text-xs md:text-sm font-bold border-b border-black pb-0.5 hover:text-gray-600 transition-colors">View All</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
