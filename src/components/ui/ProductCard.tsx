import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Truck, Store } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  displayCategory?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, displayCategory = false }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Delivery/Pickup badges */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {product.deliveryAvailable && (
            <span className="bg-blue-600 text-white text-xs py-1 px-2 rounded flex items-center">
              <Truck size={12} className="mr-1" />
              Delivery
            </span>
          )}
          {product.pickupAvailable && (
            <span className="bg-orange-500 text-white text-xs py-1 px-2 rounded flex items-center">
              <Store size={12} className="mr-1" />
              Pickup
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <div className="text-white font-bold">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-gray-900 text-lg mb-1">
          {product.name}
        </h3>
        
        {displayCategory && (
          <span className="text-xs text-gray-500 mb-2">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        )}
        
        {/* Shop info */}
        <div className="mt-1 text-sm text-gray-600 flex items-center">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="truncate">
            {product.shop.name} • {product.shop.distance} km
          </span>
        </div>
        
        {/* Rating */}
        <div className="mt-2 flex items-center">
          <Star size={14} className="text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;