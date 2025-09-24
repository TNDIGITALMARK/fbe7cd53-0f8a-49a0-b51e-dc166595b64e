export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  seller: Seller;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  specifications: Record<string, string>;
  createdAt: Date;
}

export interface Seller {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  joinedDate: Date;
  verified: boolean;
  description: string;
  totalProducts: number;
  monthlySales: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  featured: boolean;
}

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: '💻', productCount: 1247, featured: true },
  { id: 'fashion', name: 'Fashion', icon: '👔', productCount: 2156, featured: true },
  { id: 'home-goods', name: 'Home Goods', icon: '🏠', productCount: 894, featured: true },
  { id: 'beauty', name: 'Beauty', icon: '💄', productCount: 567, featured: true },
  { id: 'sports', name: 'Sports', icon: '⛺', productCount: 432, featured: true },
  { id: 'outdoor', name: 'Outdoor', icon: '👟', productCount: 321, featured: true },
  { id: 'books', name: 'Books', icon: '📚', productCount: 1876, featured: true },
  { id: 'toys', name: 'Toys', icon: '🧸', productCount: 654, featured: true },
  { id: 'food-drink', name: 'Food & Drink', icon: '🍎', productCount: 234, featured: false },
  { id: 'pet-supplies', name: 'Pet Supplies', icon: '🐕', productCount: 123, featured: false },
  { id: 'automotive', name: 'Automotive', icon: '🚗', productCount: 456, featured: false },
];

export const sellers: Seller[] = [
  {
    id: 'artisan-leatherworks',
    name: 'ArtisanLeatherworks',
    avatar: '/avatars/artisan-leather.jpg',
    rating: 4.9,
    reviewCount: 1247,
    joinedDate: new Date('2020-03-15'),
    verified: true,
    description: 'Handcrafted leather goods made with premium materials and traditional techniques.',
    totalProducts: 45,
    monthlySales: 1245,
  },
  {
    id: 'tech-innovations',
    name: 'TechInnovations',
    avatar: '/avatars/tech-innovations.jpg',
    rating: 4.7,
    reviewCount: 2341,
    joinedDate: new Date('2019-07-22'),
    verified: true,
    description: 'Cutting-edge electronics and gadgets for the modern lifestyle.',
    totalProducts: 123,
    monthlySales: 3456,
  },
  {
    id: 'urban-fashion',
    name: 'UrbanFashion',
    avatar: '/avatars/urban-fashion.jpg',
    rating: 4.8,
    reviewCount: 892,
    joinedDate: new Date('2021-01-10'),
    verified: true,
    description: 'Contemporary streetwear and fashion for the urban professional.',
    totalProducts: 78,
    monthlySales: 2134,
  },
];

export const products: Product[] = [
  {
    id: 'vintage-leather-messenger',
    title: 'Vintage Leather Messenger Bag',
    description: 'Handcrafted from premium Italian leather, this vintage-style messenger bag combines classic design with modern functionality. Features multiple compartments, adjustable strap, and antique brass hardware.',
    price: 189.99,
    images: [
      '/generated/leather-bag-1.jpg',
      '/generated/leather-bag-1.jpg',
      '/generated/leather-bag-1.jpg',
      '/generated/leather-bag-1.jpg',
    ],
    category: 'fashion',
    subcategory: 'bags',
    seller: sellers[0],
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    featured: true,
    tags: ['handmade', 'leather', 'vintage', 'messenger', 'professional'],
    specifications: {
      'Material': 'Premium Italian Leather',
      'Dimensions': '15" x 11" x 4"',
      'Color': 'Cognac Brown',
      'Hardware': 'Antique Brass',
      'Weight': '2.1 lbs',
      'Care': 'Leather conditioner recommended',
    },
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'wireless-earbuds-pro',
    title: 'Wireless Earbuds Pro',
    description: 'Premium wireless earbuds with active noise cancellation, 8-hour battery life, and crystal-clear audio quality. Perfect for commuting, workouts, and calls.',
    price: 149.99,
    images: [
      '/generated/earbuds-1.jpg',
      '/generated/earbuds-1.jpg',
      '/generated/earbuds-1.jpg',
    ],
    category: 'electronics',
    subcategory: 'audio',
    seller: sellers[1],
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    featured: true,
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium'],
    specifications: {
      'Battery Life': '8 hours (32 hours with case)',
      'Connectivity': 'Bluetooth 5.0',
      'Noise Cancellation': 'Active ANC',
      'Water Resistance': 'IPX7',
      'Charging': 'USB-C + Wireless',
    },
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'organic-skincare-set',
    title: 'Organic Skincare Set',
    description: 'Complete 4-piece organic skincare routine with cleanser, toner, serum, and moisturizer. Made with natural ingredients and essential oils.',
    price: 79.99,
    images: [
      '/products/skincare-1.jpg',
      '/products/skincare-2.jpg',
    ],
    category: 'beauty',
    subcategory: 'skincare',
    seller: sellers[2],
    rating: 4.9,
    reviewCount: 234,
    inStock: true,
    featured: true,
    tags: ['organic', 'natural', 'skincare', 'routine', 'gift-set'],
    specifications: {
      'Skin Type': 'All skin types',
      'Ingredients': '100% Organic',
      'Size': '4-piece set',
      'Cruelty Free': 'Yes',
      'Packaging': 'Recyclable',
    },
    createdAt: new Date('2024-01-30'),
  },
  {
    id: 'smart-fitness-watch',
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.',
    price: 299.99,
    images: [
      '/products/watch-1.jpg',
      '/products/watch-2.jpg',
      '/products/watch-3.jpg',
    ],
    category: 'electronics',
    subcategory: 'wearables',
    seller: sellers[1],
    rating: 4.7,
    reviewCount: 456,
    inStock: true,
    featured: false,
    tags: ['fitness', 'smartwatch', 'health', 'GPS', 'waterproof'],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days typical use',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart Rate, GPS, Accelerometer',
      'Compatibility': 'iOS 12+ / Android 6+',
    },
    createdAt: new Date('2024-03-05'),
  },
];

export const reviews: Review[] = [
  {
    id: 'review-1',
    productId: 'vintage-leather-messenger',
    userId: 'user-1',
    userName: 'Sarah Johnson',
    userAvatar: '/avatars/sarah.jpg',
    rating: 5,
    title: 'Excellent quality and craftsmanship',
    content: 'This bag exceeded my expectations! The leather is buttery soft and the construction is top-notch. I use it daily for work and it still looks brand new after 6 months.',
    verified: true,
    helpful: 23,
    createdAt: new Date('2024-03-15'),
  },
  {
    id: 'review-2',
    productId: 'vintage-leather-messenger',
    userId: 'user-2',
    userName: 'Mike Chen',
    userAvatar: '/avatars/mike.jpg',
    rating: 4,
    title: 'Great bag, minor issue with strap',
    content: 'Love the vintage look and feel. The bag holds all my laptop gear perfectly. Only issue is the strap adjuster is a bit stiff, but overall very happy with the purchase.',
    verified: true,
    helpful: 12,
    createdAt: new Date('2024-02-28'),
  },
  {
    id: 'review-3',
    productId: 'wireless-earbuds-pro',
    userId: 'user-3',
    userName: 'Emily Davis',
    userAvatar: '/avatars/emily.jpg',
    rating: 5,
    title: 'Best earbuds I\'ve owned',
    content: 'The noise cancellation is incredible and the sound quality is amazing. Battery lasts all day and the case is compact. Highly recommend!',
    verified: true,
    helpful: 45,
    createdAt: new Date('2024-03-10'),
  },
];

export const cartItems = [
  {
    id: 'cart-1',
    product: products[0],
    quantity: 1,
    addedAt: new Date(),
  },
  {
    id: 'cart-2',
    product: products[1],
    quantity: 2,
    addedAt: new Date(),
  },
];

export interface Order {
  id: string;
  sellerId: string;
  buyerName: string;
  buyerEmail: string;
  products: Array<{
    product: Product;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

export const orders: Order[] = [
  {
    id: 'order-001',
    sellerId: 'artisan-leatherworks',
    buyerName: 'John Smith',
    buyerEmail: 'john@example.com',
    products: [
      {
        product: products[0],
        quantity: 1,
        price: 189.99,
      },
    ],
    total: 189.99,
    status: 'processing',
    orderDate: new Date('2024-03-20'),
    shippingAddress: {
      name: 'John Smith',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
    },
  },
  {
    id: 'order-002',
    sellerId: 'artisan-leatherworks',
    buyerName: 'Lisa Wilson',
    buyerEmail: 'lisa@example.com',
    products: [
      {
        product: products[0],
        quantity: 2,
        price: 189.99,
      },
    ],
    total: 379.98,
    status: 'shipped',
    orderDate: new Date('2024-03-18'),
    shippingAddress: {
      name: 'Lisa Wilson',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90210',
    },
  },
];