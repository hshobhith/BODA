import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Store } from 'lucide-react';
import { Shop } from '../../types';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <Link 
      to={`/shop/${shop.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full overflow-hidden"
    >
      {/* Shop Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <Store size={48} className="text-gray-400" />
        </div>
        
        {/* Rating badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white text-xs py-1 px-2 rounded flex items-center">
            <Star size={12} className="mr-1" />
            {shop.rating.toFixed(1)}
          </span>
        </div>
      </div>
      
      {/* Shop Info */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-gray-900 text-lg mb-1">
          {shop.name}
        </h3>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-2">
          {shop.categories.map(category => (
            <span 
              key={category}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          ))}
        </div>
        
        {/* Location */}
        <div className="mt-auto text-sm text-gray-600 flex items-center">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="truncate">
            {shop.address} • {shop.distance} km
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard; 