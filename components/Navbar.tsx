
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Camera, Loader2, ChevronLeft } from 'lucide-react';
import { useApp } from '../App';
import { analyzeSearchQuery, searchByImage } from '../services/geminiService';
import { Category, Activity, SearchFilters } from '../types';

// Menu Configuration
interface MenuColumn {
  title: string;
  links: { label: string; filter: SearchFilters }[];
}

interface MenuData {
  [key: string]: {
    columns: MenuColumn[];
  };
}

const MENU_DATA: MenuData = {
  new: {
    columns: [
      {
        title: "Featured",
        links: [
          { label: "New Arrivals", filter: { featured: 'new' } },
          { label: "Best Sellers", filter: { featured: 'bestseller' } },
        ]
      },
      {
        title: "Shop By Sport",
        links: Object.values(Activity).map(a => ({ label: a, filter: { activity: a } }))
      }
    ]
  },
  men: {
    columns: [
      {
        title: "Featured",
        links: [
          { label: "New Arrivals", filter: { featured: 'new' } },
          { label: "Best Sellers", filter: { featured: 'bestseller' } },
        ]
      },
      {
        title: "Shop By Sport",
        links: Object.values(Activity).map(a => ({ label: a, filter: { activity: a } }))
      },
      {
        title: "Gear & Accessories",
        links: Object.values(Category).map(c => ({ label: c, filter: { category: c } }))
      }
    ]
  },
  women: {
    columns: [
      {
        title: "Featured",
        links: [
          { label: "New Arrivals", filter: { featured: 'new' } },
          { label: "Best Sellers", filter: { featured: 'bestseller' } },
        ]
      },
      {
        title: "Shop By Sport",
        links: Object.values(Activity).map(a => ({ label: a, filter: { activity: a } }))
      },
      {
        title: "Gear & Accessories",
        links: Object.values(Category).map(c => ({ label: c, filter: { category: c } }))
      }
    ]
  },
  kids: {
    columns: [
       {
       title: "Featured",
       links: [
          { label: "New Arrivals", filter: { featured: 'new' } },
          { label: "Best Sellers", filter: { featured: 'bestseller' } },
        ]
      },
      {
        title: "Shop By Sport",
        links: Object.values(Activity).map(a => ({ label: a, filter: { activity: a } }))
      },
      {
        title: "Gear & Accessories",
        links: Object.values(Category).map(c => ({ label: c, filter: { category: c } }))
      }
    ]
  }
};

const Navbar: React.FC = () => {
  const { cart } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isHome = location.pathname === '/';

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        if (isSearchOpen && !searchQuery) {
          setIsSearchOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, searchQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const filters = await analyzeSearchQuery(searchQuery);
    navigate('/shop', { state: { filters, originalQuery: searchQuery } });
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzingImage(true);
    // Keep search open to show loading
    if (!isSearchOpen) setIsSearchOpen(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(',')[1];
      const filters = await searchByImage(base64String);
      
      setIsAnalyzingImage(false);
      setSearchQuery(''); // clear text if any
      
      if (filters) {
        navigate('/shop', { state: { filters, originalQuery: 'Visual Search Result' } });
        setIsSearchOpen(false);
      }
    };
    reader.readAsDataURL(file);
    // Reset input
    e.target.value = '';
  };

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen) {
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 100);
    }
  };

  const handleNavClick = (filters: SearchFilters, title: string) => {
      setActiveMenu(null);
      navigate('/shop', { state: { filters, originalQuery: title } });
  }

  const navToSale = () => {
    navigate('/shop', { state: { filters: { maxPrice: 100 }, originalQuery: "Sale Items (Under $100)" } });
  }

  return (
    <nav 
        className="fixed top-0 w-full bg-white z-50 h-[60px] font-sans border-b border-transparent md:border-gray-100 transition-all duration-300"
        onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="w-full h-full flex items-center justify-between px-6 md:px-10 relative bg-white z-50">
        
        {/* Left Section: Back Button & Logo */}
        <div className="flex-shrink-0 z-50 flex items-center gap-4">
            {!isHome && (
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors group"
                    title="Go Back"
                >
                    <ChevronLeft className="w-5 h-5 text-brand-black group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                </button>
            )}
            <Link to="/" className="text-2xl font-black tracking-tighter italic whitespace-nowrap hover:opacity-70 transition-opacity block">
                STRIDE<span className="text-brand-highlight text-3xl">.</span>
            </Link>
        </div>

        {/* Center Section: Navigation Links (Absolute Center) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full items-center gap-6 lg:gap-8 font-bold text-sm tracking-tight text-brand-black">
            <div 
                className="h-full flex items-center border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
                onMouseEnter={() => setActiveMenu('new')}
            >
                <Link to="/shop" className="py-2">New & Featured</Link>
            </div>
            <div 
                className="h-full flex items-center border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
                onMouseEnter={() => setActiveMenu('men')}
            >
                <button className="py-2">Men</button>
            </div>
             <div 
                className="h-full flex items-center border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
                onMouseEnter={() => setActiveMenu('women')}
            >
                <button className="py-2">Women</button>
            </div>
             <div 
                className="h-full flex items-center border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
                onMouseEnter={() => setActiveMenu('kids')}
            >
                <button className="py-2">Kids</button>
            </div>
            <div 
                className="h-full flex items-center border-b-2 border-transparent hover:border-black transition-all cursor-pointer"
                onMouseEnter={() => setActiveMenu(null)}
            >
                <button onClick={navToSale} className="py-2">Sale</button>
            </div>
        </div>

        {/* Right Section: Search & Utilities */}
        <div className="flex items-center gap-2 md:gap-2 justify-end z-50">
           {/* Desktop Search */}
           <div 
             ref={searchContainerRef}
             className={`hidden md:flex items-center transition-all duration-300 ease-out rounded-full relative ${
                isSearchOpen ? 'w-[260px] bg-[#f5f5f5]' : 'w-9 bg-transparent'
             }`}
           >
                {/* Search Icon / Toggle */}
                <button 
                    type="button"
                    onClick={toggleSearch}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full ${isSearchOpen ? 'hover:bg-transparent' : 'hover:bg-gray-100'} transition-colors z-10`}
                >
                    <Search className="h-5 w-5 text-brand-black" strokeWidth={2} />
                </button>

                {/* Search Input Form */}
                <form 
                    onSubmit={handleSearch} 
                    className={`w-full h-9 flex items-center ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}
                >
                    <input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder={isAnalyzingImage ? "Analyzing image..." : "Search"}
                        disabled={isAnalyzingImage}
                        className="w-full bg-transparent border-none focus:ring-0 text-base font-medium text-brand-black outline-none h-full pl-10 pr-10 text-left placeholder:text-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Camera / Visual Search Button */}
                 <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors z-20 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    title="Search by Image"
                >
                    {isAnalyzingImage ? (
                        <Loader2 className="h-4 w-4 text-brand-black animate-spin" />
                    ) : (
                        <Camera className="h-4 w-4 text-gray-500" strokeWidth={2} />
                    )}
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                />
           </div>

            {/* AI Stylist Button removed on header (available in bottom nav) */}
          
            {/* Cart Icon */}
           <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingBag className="w-6 h-6 text-brand-black" strokeWidth={2} />
            {cartCount > 0 && (
                <span className="absolute top-0.5 right-0 bg-brand-black text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {cartCount}
                </span>
            )}
            </Link>
          
          {/* Mobile Search Icon */}
          <button onClick={() => navigate('/shop')} className="md:hidden text-gray-900 p-2">
             <Search className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* MEGA MENU OVERLAY */}
      <div 
        className={`absolute top-full left-0 w-full bg-white transition-all duration-300 ease-out origin-top overflow-hidden shadow-xl z-40 ${
            activeMenu ? 'opacity-100 visible translate-y-0 max-h-[500px]' : 'opacity-0 invisible -translate-y-2 max-h-0'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-12 py-10 pb-16">
           {activeMenu && MENU_DATA[activeMenu] && (
               <div className="flex justify-center">
                    <div className="grid grid-cols-4 gap-12 w-full max-w-4xl">
                        {MENU_DATA[activeMenu].columns.map((col, idx) => (
                            <div key={idx} className="flex flex-col space-y-4">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-black mb-2">{col.title}</h3>
                                <div className="flex flex-col space-y-3">
                                    {col.links.map((link, linkIdx) => (
                                        <button 
                                            key={linkIdx} 
                                            onClick={() => handleNavClick(link.filter, link.label)}
                                            className="text-left text-gray-500 hover:text-black font-medium text-sm transition-colors duration-200"
                                        >
                                            {link.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
               </div>
           )}
        </div>
      </div>
      
      {/* Dimmed Background Overlay */}
      <div className={`fixed inset-0 top-[60px] bg-black/20 backdrop-blur-[2px] transition-opacity duration-500 z-30 pointer-events-none ${activeMenu ? 'opacity-100' : 'opacity-0'}`} />
    </nav>
  );
};

export default Navbar;
