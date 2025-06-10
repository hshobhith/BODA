export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[]; // Array of image URLs
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  shop: Shop;
  rating: number;
  deliveryAvailable: boolean;
  pickupAvailable: boolean;
  reviews?: Review[];
  store?: {
    id: number;
    name: string;
    address: string;
    operatingHours: {
      openTime: string;
      closeTime: string;
      openAllDays: boolean;
      operatingDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
      };
    };
  };
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  distance: number; // in kilometers
  categories: string[];
  isOpen: boolean;
  images: {
    id: number;
    url: string;
    isPrimary: boolean;
  }[];
}

export interface Order {
  id: string;
  products: {
    product: Product;
    quantity: number;
  }[];
  total: number;
  status: 'placed' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'ready_for_pickup' | 'completed';
  createdAt: string;
  fulfillmentMethod: 'delivery' | 'pickup';
  deliveryAddress?: string;
  paymentMethod: 'upi' | 'card' | 'wallet' | 'cash';
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: string[];
  orders: Order[];
}

export type Category = 'groceries' | 'electronics' | 'clothes' | 'footwear' | 'home' | 'beauty' | 'sports';

export interface CartItem {
  product: Product;
  quantity: number;
  deliveryMethod: 'delivery' | 'pickup';
}