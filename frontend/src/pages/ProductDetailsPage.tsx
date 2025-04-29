import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Truck, Store, Clock, Heart, Shield, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { products } from '../data/mockData';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<'delivery' | 'pickup'>('delivery');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    // Find product by ID from our mock data
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Default to the available option
      if (!foundProduct.deliveryAvailable && foundProduct.pickupAvailable) {
        setSelectedOption('pickup');
      }
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image */}
        <div className="rounded-lg overflow-hidden bg-white shadow-sm">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star size={18} className="text-yellow-400" />
              <span className="ml-1 text-gray-700">{product.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>{product.shop.name}</span>
            </div>
          </div>

          <div className="text-2xl font-bold text-blue-600 mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          <div className="mb-6">
            <div className="text-gray-700 font-medium mb-2">Quantity</div>
            <div className="flex items-center">
              <button 
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l text-gray-600"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 h-8 text-center border-t border-b border-gray-300 focus:outline-none"
              />
              <button 
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r text-gray-600"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Delivery/Pickup options */}
          <div className="mb-6">
            <div className="text-gray-700 font-medium mb-2">How would you like to get this?</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <div className="text-xs text-gray-500">Est. 1-2 hours</div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              size="large"
              fullWidth
              icon={<Heart size={18} />}
            >
              Save for Later
            </Button>
          </div>

          {/* Shop info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Available at</div>
            <div className="flex items-start">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                <Store size={24} />
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-900">{product.shop.name}</div>
                <div className="text-sm text-gray-600 mb-1">{product.shop.address}</div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={14} className="mr-1" />
                  <span>Open until 9:00 PM</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <MapPin size={14} className="mr-1" />
                  <span>{product.shop.distance.toFixed(1)} km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional product information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <Truck size={24} className="text-blue-600 flex-shrink-0" />
          <div className="ml-4">
            <h3 className="font-medium text-gray-900 mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Quick delivery with real-time tracking available on eligible items.</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <Shield size={24} className="text-blue-600 flex-shrink-0" />
          <div className="ml-4">
            <h3 className="font-medium text-gray-900 mb-1">Quality Guarantee</h3>
            <p className="text-sm text-gray-600">We ensure the quality of all products sold on our platform.</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <Store size={24} className="text-blue-600 flex-shrink-0" />
          <div className="ml-4">
            <h3 className="font-medium text-gray-900 mb-1">Support Local</h3>
            <p className="text-sm text-gray-600">Every purchase helps support local businesses in your community.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;