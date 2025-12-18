
export enum Category {
  EQUIPMENT = 'Equipment', // Bats, Rackets, Paddles
  BALLS = 'Balls',
  PROTECTIVE = 'Protective Gear',
  ACCESSORIES = 'Accessories'
}

export enum Gender { // Repurposed for sizing/demographic
  ADULT = 'Adult',
  JUNIOR = 'Junior',
  UNISEX = 'Unisex'
}

export enum Activity {
  CRICKET = 'Cricket',
  SOCCER = 'Soccer',
  TENNIS = 'Tennis',
  PICKLEBALL = 'Pickleball',
  BADMINTON = 'Badminton',
  FOOTBALL = 'Football',
  RACQUETBALL = 'Racquetball'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  gender: Gender;
  activity: Activity;
  images: string[]; // Changed from single image string to array
  description: string;
  features: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  generated?: boolean; // Flag to track if AI images are populated
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

// AI Related Types
export interface SearchFilters {
  category?: string;
  activity?: string;
  gender?: string;
  maxPrice?: number;
  keywords?: string[];
  featured?: 'new' | 'bestseller';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  recommendedProducts?: Product[];
  suggestions?: string[];
  isError?: boolean;
}
