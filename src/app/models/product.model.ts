export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'men' | 'women' | 'kids' | 'home' | 'beauty';
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  ratingCount: number;
  images: string[];
  trending?: boolean;
  dealOfTheDay?: boolean;
  badgeText?: string;
  sizes: string[];
  description: string;
  styleNote?: string;
  productDetails?: string[];
  promoCard?: {
    headline: string;
    discountText: string;
    actionText: string;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  badgeTag?: string;
  size: string;
  quantity: number;
  price: number;
  originalPrice: number;
  image: string;
  availableSizes: string[];
}

export interface FilterOptions {
  category: string;
  subCategories: string[];
  brands: string[];
  priceRange: string | null;
  minDiscount: number | null;
  searchQuery: string;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'discount' | 'rating';
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrder: number;
  description: string;
}
