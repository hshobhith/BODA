import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, MapPin, Truck, Store, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import { products } from '../data/mockData';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedOption, setSelectedOption] = useState<'delivery' | 'pickup'>('delivery');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption);
    navigate('/cart');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Product Image */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="text-2xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </div>

            {/* Rating and Shop Info */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Store size={16} className="mr-2" />
                <span className="font-medium">{product.shop.name}</span>
                <span className="mx-2 text-gray-300">•</span>
                <MapPin size={16} className="mr-1" />
                <span>{product.shop.distance.toFixed(1)} km away</span>
                <span className="mx-2 text-gray-300">•</span>
                <Clock size={16} className="mr-1" />
                <span>Closes at {product.shop.isOpen ? '9:00 PM' : 'Closed'}</span>
              </div>
            </div>
          </div>

          {/* Delivery/Pickup Options */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Choose Delivery Option</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.deliveryAvailable && (
                <button
                  onClick={() => setSelectedOption('delivery')}
                  className={`flex items-center p-3 rounded-lg border ${
                    selectedOption === 'delivery' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <Truck size={20} className={selectedOption === 'delivery' ? 'text-blue-600' : 'text-gray-600'} />
                  <div className="ml-3 text-left">
                    <div className={selectedOption === 'delivery' ? 'font-medium text-blue-600' : 'font-medium text-gray-700'}>
                      Delivery
                    </div>
                    <div className="text-xs text-gray-500">Standard delivery</div>
                  </div>
                </button>
              )}
              
              {product.pickupAvailable && (
                <button
                  onClick={() => setSelectedOption('pickup')}
                  className={`flex items-center p-3 rounded-lg border ${
                    selectedOption === 'pickup' 
                      ? 'border-orange-600 bg-orange-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <Store size={20} className={selectedOption === 'pickup' ? 'text-orange-600' : 'text-gray-600'} />
                  <div className="ml-3 text-left">
                    <div className={selectedOption === 'pickup' ? 'font-medium text-orange-600' : 'font-medium text-gray-700'}>
                      Pickup
                    </div>
                    <div className="text-xs text-gray-500">{product.shop.distance.toFixed(1)} km away</div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center border rounded-lg p-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 text-gray-600"
              >
                -
              </button>
              <span className="flex-grow text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 text-gray-600"
              >
                +
              </button>
            </div>
            
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;