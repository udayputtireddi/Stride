
import { Product, Category, Gender, Activity } from './types';

// Static product images stored locally for reliability
export const MOCK_PRODUCTS: Product[] = [
  // CRICKET
  {
    id: 'c1',
    name: 'Pro English Willow Bat',
    price: 350,
    category: Category.EQUIPMENT,
    gender: Gender.ADULT,
    activity: Activity.CRICKET,
    images: ['/images/products/cricket-bat.jpg'],
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
    images: ['/images/products/cricket-pads.jpg'],
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
    images: ['/images/products/cricket-ball.jpg'],
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
    images: ['/images/products/soccer-ball.jpg'],
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
    images: ['/images/products/shin-guards.png'],
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
    images: ['/images/products/tennis-racket.jpg'],
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
    images: ['/images/products/tennis-ball.jpg'],
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
    images: ['/images/products/pickleball-paddle.jpg'],
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
    images: ['/images/products/pickleball-balls.jpg'],
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
    images: ['/images/products/badminton-racket.jpg'],
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
    images: ['/images/products/shuttlecocks.jpg'],
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
    images: ['/images/products/football.jpg'],
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
    images: ['/images/products/racquetball-racket.jpg'],
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
    images: ['/images/products/eyeguards.jpg'],
    description: "Anti-fog, scratch-resistant protective eyewear. Mandatory for tournament play.",
    features: ['Anti-fog lens', 'Adjustable strap', 'Vented design'],
  }
];

export const INITIAL_CHAT_MESSAGE: { role: 'model', text: string } = {
  role: 'model',
  text: "Welcome to Stride. I'm your Sports Equipment Expert. Whether you need the perfect cricket bat, a pro-level football, or pickleball gear, I can help you choose based on your skill level and style. What sport are you playing today?"
};
