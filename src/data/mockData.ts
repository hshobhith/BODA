import { Product, Shop, Order, User, Category } from '../types';

// Helper to create a random distance
const randomDistance = () => Number((Math.random() * 5 + 0.5).toFixed(1));

// Shops
export const shops: Shop[] = [
  {
    id: '1',
    name: 'SuperMart',
    address: '123 Main St, Downtown',
    location: { lat: 40.7128, lng: -74.006 },
    rating: 4.5,
    distance: randomDistance(),
    categories: ['groceries', 'home'],
  },
  {
    id: '2',
    name: 'ElectroHub',
    address: '456 Tech Ave, Uptown',
    location: { lat: 40.7228, lng: -74.016 },
    rating: 4.2,
    distance: randomDistance(),
    categories: ['electronics'],
  },
  {
    id: '3',
    name: 'Fashion Forward',
    address: '789 Style St, Midtown',
    location: { lat: 40.7328, lng: -74.026 },
    rating: 4.7,
    distance: randomDistance(),
    categories: ['clothes', 'footwear'],
  },
  {
    id: '4',
    name: 'Organic Oasis',
    address: '101 Green Rd, Eastside',
    location: { lat: 40.7428, lng: -73.996 },
    rating: 4.8,
    distance: randomDistance(),
    categories: ['groceries'],
  },
  {
    id: '5',
    name: 'Tech Treasures',
    address: '202 Gadget Ln, Westside',
    location: { lat: 40.7028, lng: -74.036 },
    rating: 4.0,
    distance: randomDistance(),
    categories: ['electronics'],
  },
];

// Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 1.99,
    description: 'Fresh organic bananas, locally sourced. Bundle of 5-6 bananas per order.',
    image: 'https://images.pexels.com/photos/47305/bananas-banana-shrub-fruits-yellow-47305.jpeg',
    category: 'groceries',
    shop: shops[0],
    rating: 4.6,
    deliveryAvailable: true,
    pickupAvailable: true,
  },
  {
    id: '2',
    name: 'Smartphone X',
    price: 699.99,
    description: 'Latest model with 6.5" display, 128GB storage, and triple camera setup.',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    category: 'electronics',
    shop: shops[1],
    rating: 4.8,
    deliveryAvailable: true,
    pickupAvailable: true,
  },
  {
    id: '3',
    name: 'Designer Jeans',
    price: 89.99,
    description: 'Premium quality denim jeans with a modern fit and classic look.',
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
    category: 'clothes',
    shop: shops[2],
    rating: 4.4,
    deliveryAvailable: false,
    pickupAvailable: true,
  },
  {
    id: '4',
    name: 'Farm Fresh Eggs',
    price: 4.99,
    description: 'Dozen free-range eggs from local farms. Fresh and nutritious.',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
    category: 'groceries',
    shop: shops[3],
    rating: 4.9,
    deliveryAvailable: true,
    pickupAvailable: true,
  },
  {
    id: '5',
    name: 'Wireless Headphones',
    price: 149.99,
    description: 'Premium noise-canceling headphones with 30-hour battery life.',
    image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg',
    category: 'electronics',
    shop: shops[4],
    rating: 4.7,
    deliveryAvailable: true,
    pickupAvailable: true,
  },
  {
    id: '6',
    name: 'Fresh Avocados',
    price: 2.49,
    description: 'Perfectly ripe avocados. Smooth, creamy and ready to eat.',
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg',
    category: 'groceries',
    shop: shops[0],
    rating: 4.3,
    deliveryAvailable: true,
    pickupAvailable: true,
  },
  {
    id: '7',
    name: 'Smart Watch',
    price: 249.99,
    description: 'Track your fitness, receive notifications and more with this sleek smart watch.',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'electronics',
    shop: shops[1],
    rating: 4.5,
    deliveryAvailable: true,
    pickupAvailable: true,
  },
  {
    id: '8',
    name: 'Running Shoes',
    price: 129.99,
    description: 'Lightweight, comfortable running shoes with superior cushioning.',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    category: 'footwear',
    shop: shops[2],
    rating: 4.6,
    deliveryAvailable: false,
    pickupAvailable: true,
  },
];

// Categories with icons (icon names from Lucide React)
export const categories: { id: Category; name: string; icon: string }[] = [
  { id: 'groceries', name: 'Groceries', icon: 'apple' },
  { id: 'electronics', name: 'Electronics', icon: 'smartphone' },
  { id: 'clothes', name: 'Clothes', icon: 'shirt' },
  { id: 'footwear', name: 'Footwear', icon: 'boot' },
  { id: 'home', name: 'Home', icon: 'home' },
  { id: 'beauty', name: 'Beauty', icon: 'sparkles' },
  { id: 'sports', name: 'Sports', icon: 'dumbbell' },
];

// Mock user
export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  addresses: [
    '123 Home St, Apartment 4B, New York, NY 10001',
    '456 Work Ave, Suite 700, New York, NY 10002',
  ],
  orders: [],
};

// Generate some mock orders
export const orders: Order[] = [
  {
    id: '1001',
    products: [
      { product: products[0], quantity: 2 },
      { product: products[3], quantity: 1 },
    ],
    total: products[0].price * 2 + products[3].price,
    status: 'delivered',
    createdAt: '2023-05-15T14:30:00Z',
    fulfillmentMethod: 'delivery',
    deliveryAddress: currentUser.addresses[0],
    paymentMethod: 'card',
  },
  {
    id: '1002',
    products: [
      { product: products[4], quantity: 1 },
    ],
    total: products[4].price,
    status: 'confirmed',
    createdAt: '2023-05-20T10:15:00Z',
    fulfillmentMethod: 'pickup',
    paymentMethod: 'upi',
  },
];

// Add orders to user
currentUser.orders = orders;

// Helper functions to filter and search products
export const getProductsByCategory = (categoryId: Category | 'all'): Product[] => {
  if (categoryId === 'all') return products;
  return products.filter(product => product.category === categoryId);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.shop.name.toLowerCase().includes(lowerQuery)
  );
};

export const getFeaturedProducts = (): Product[] => {
  // In a real app, this might be based on popularity, sales, etc.
  return products.slice(0, 4);
};

export const getFeaturedShops = (): Shop[] => {
  // In a real app, this might be based on popularity, rating, etc.
  return shops.slice(0, 4);
};