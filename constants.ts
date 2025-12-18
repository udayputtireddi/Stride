
import { Product, Category, Gender, Activity } from './types';

// We keep one fallback image to ensure layout stability before AI generates the assets
export const MOCK_PRODUCTS: Product[] = [
  // CRICKET
  {
    id: 'c1',
    name: 'Pro English Willow Bat',
    price: 350,
    category: Category.EQUIPMENT,
    gender: Gender.ADULT,
    activity: Activity.CRICKET,
    images: ['https://images.unsplash.com/photo-1593341646261-12c82f05eb4d?q=80&w=1000&auto=format&fit=crop'],
    description: "Grade 1 English Willow cricket bat with a large sweet spot. Designed for power hitters who need balance and lightweight pickup.",
    features: ['Grade 1 English Willow', '9-grain structure', 'Mid-to-low swell'],
    isBestSeller: true
  },
  {
    id: 'c2',
    name: 'Test Match Leg Guards',
    price: 85,
    category: Category.PROTECTIVE,
    gender: Gender.ADULT,
    activity: Activity.CRICKET,
    images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop'], 
    description: "Ultra-lightweight high-density foam pads offering test-match level protection. Cane reinforced for maximum impact absorption.",
    features: ['High-density foam', 'Gel-zone knee cup', 'Side wing protection'],
  },
  {
    id: 'c3',
    name: 'County League Ball (Pack of 6)',
    price: 120,
    category: Category.BALLS,
    gender: Gender.UNISEX,
    activity: Activity.CRICKET,
    images: ['https://images.unsplash.com/photo-1629257626960-9a9987f2e132?q=80&w=1000&auto=format&fit=crop'],
    description: "Premium alum tanned leather cricket balls, hand-stitched for durability and swing. Suitable for 50-over matches.",
    features: ['Alum tanned leather', 'Hand-stitched seam', 'Four-piece construction'],
  },

  // SOCCER
  {
    id: 's1',
    name: 'Elite Match Ball',
    price: 160,
    category: Category.BALLS,
    gender: Gender.UNISEX,
    activity: Activity.SOCCER,
    images: ['https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=1000&auto=format&fit=crop'],
    description: "FIFA Quality Pro certified match ball. Thermally bonded seamless surface for more predictable trajectory and lower water uptake.",
    features: ['Thermally bonded', 'FIFA Quality Pro', 'Textured surface'],
    isNew: true
  },
  {
    id: 's2',
    name: 'Pro Carbon Shin Guards',
    price: 45,
    category: Category.PROTECTIVE,
    gender: Gender.ADULT,
    activity: Activity.SOCCER,
    images: ['https://images.unsplash.com/photo-1518605348400-437731db4857?q=80&w=1000&auto=format&fit=crop'], 
    description: "Low-profile carbon fiber shin guards designed for speed and protection. Includes compression sleeves to keep them in place.",
    features: ['Carbon fiber shell', 'EVA backing', 'Compression sleeves included'],
  },

  // TENNIS
  {
    id: 't1',
    name: 'V-Core Pro 97',
    price: 240,
    category: Category.EQUIPMENT,
    gender: Gender.ADULT,
    activity: Activity.TENNIS,
    images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop'],
    description: "For advanced players looking for flexible precision and control. Isometric head shape for a larger sweet spot.",
    features: ['97 sq in head', '310g weight', 'Vibration Dampening Mesh'],
    isBestSeller: true
  },
  {
    id: 't2',
    name: 'Championship Balls (Case)',
    price: 80,
    category: Category.BALLS,
    gender: Gender.UNISEX,
    activity: Activity.TENNIS,
    images: ['https://images.unsplash.com/photo-1592709823125-a191f07a2a5e?q=80&w=1000&auto=format&fit=crop'],
    description: "Case of 24 cans. Heavy-duty felt designed for hard court play. Consistent bounce and longevity.",
    features: ['Extra Duty Felt', 'USTA Approved', 'High visibility'],
  },

  // PICKLEBALL
  {
    id: 'p1',
    name: 'Carbon Graphite Paddle',
    price: 130,
    category: Category.EQUIPMENT,
    gender: Gender.UNISEX,
    activity: Activity.PICKLEBALL,
    images: ['https://images.unsplash.com/photo-1599586120429-48285b6a8a80?q=80&w=1000&auto=format&fit=crop'],
    description: "Raw carbon fiber face for maximum spin and control. Polypropylene honeycomb core reduces vibration.",
    features: ['Raw Carbon Face', '16mm Core', 'Elongated handle'],
    isNew: true
  },
  {
    id: 'p2',
    name: 'Outdoor Pickleballs (Pack of 12)',
    price: 35,
    category: Category.BALLS,
    gender: Gender.UNISEX,
    activity: Activity.PICKLEBALL,
    images: ['https://plus.unsplash.com/premium_photo-1677171749344-932d43bd6c68?q=80&w=1000&auto=format&fit=crop'],
    description: "Official outdoor balls with 40 holes. seamless one-piece construction for a true flight and bounce.",
    features: ['40 precision holes', 'Rotation molded', 'High visibility neon'],
  },

  // BADMINTON
  {
    id: 'b1',
    name: 'Nanoflare Speed Racket',
    price: 180,
    category: Category.EQUIPMENT,
    gender: Gender.UNISEX,
    activity: Activity.BADMINTON,
    images: ['https://images.unsplash.com/photo-1626224583764-847890e045b5?q=80&w=1000&auto=format&fit=crop'],
    description: "Head-light balance for rapid handling and fast rallies. High modulus graphite construction.",
    features: ['Head-light balance', 'Isometric shape', 'Ultra slim shaft'],
  },
  {
    id: 'b2',
    name: 'Feather Shuttlecocks (Tube)',
    price: 30,
    category: Category.BALLS,
    gender: Gender.UNISEX,
    activity: Activity.BADMINTON,
    images: ['https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=1000&auto=format&fit=crop'],
    description: "Competition grade goose feather shuttlecocks. Precision manufactured to ensure the correct speed and flight path.",
    features: ['Goose feather', 'Cork base', 'Speed 77'],
  },

  // FOOTBALL (American)
  {
    id: 'f1',
    name: 'The Duke Official Ball',
    price: 100,
    category: Category.BALLS,
    gender: Gender.UNISEX,
    activity: Activity.FOOTBALL,
    images: ['https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop'],
    description: "Official size and weight game ball. Handcrafted with exclusive Horween leather and double laces for grip.",
    features: ['Horween Leather', 'Double laced', 'Official Size'],
  },

  // RACQUETBALL
  {
    id: 'r1',
    name: 'Killer 170 Racket',
    price: 150,
    category: Category.EQUIPMENT,
    gender: Gender.ADULT,
    activity: Activity.RACQUETBALL,
    images: ['https://images.unsplash.com/photo-1554068865-2415f5480070?q=80&w=1000&auto=format&fit=crop'], // Tennis/Racquet generic
    description: "Teardrop shape for maximum power. Designed for club players seeking a blend of power and maneuverability.",
    features: ['170g unstrung', 'Teardrop shape', 'Power string pattern'],
  },
  {
    id: 'r2',
    name: 'Protective Eyeguards',
    price: 25,
    category: Category.PROTECTIVE,
    gender: Gender.UNISEX,
    activity: Activity.RACQUETBALL,
    images: ['https://images.unsplash.com/photo-1606596472260-25eb3b174092?q=80&w=1000&auto=format&fit=crop'],
    description: "Anti-fog, scratch-resistant protective eyewear. Mandatory for tournament play.",
    features: ['Anti-fog lens', 'Adjustable strap', 'Vented design'],
  }
];

export const INITIAL_CHAT_MESSAGE: { role: 'model', text: string } = {
  role: 'model',
  text: "Welcome to Stride. I'm your Sports Equipment Expert. Whether you need the perfect cricket bat, a pro-level football, or pickleball gear, I can help you choose based on your skill level and style. What sport are you playing today?"
};

// --- PERSISTENCE HYDRATION ---
// This runs on app load to restore AI generated images from local storage
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    MOCK_PRODUCTS.forEach(product => {
      const storageKey = `stride_imgs_${product.id}`;
      const cachedData = localStorage.getItem(storageKey);
      if (cachedData) {
        try {
          const images = JSON.parse(cachedData);
          if (Array.isArray(images) && images.length > 0) {
            product.images = images;
            product.generated = true;
          }
        } catch (e) {
          console.warn(`Failed to parse cached images for ${product.id}`);
        }
      }
    });
  }
} catch (e) {
  console.error("Hydration from local storage failed", e);
}
