import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, MapPin, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { location } = useLocation();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState(location?.city ? `Your address in ${location.city}` : '');

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="flex justify-center mb-6">
          <ShoppingCart size={64} className="text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/">
          <Button
            variant="primary"
            size="large"
          >
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.product.id} className="py-6 flex">
                  {/* Product image */}
                  <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                    <img 
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product details */}
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between">
                        <Link to={`/product/${item.product.id}`} className="text-lg font-medium text-gray-900 hover:text-blue-600">
                          {item.product.name}
                        </Link>
                        <p className="text-base font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span>{item.product.shop.name}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        ${item.product.price.toFixed(2)} each
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center">
                      {/* Quantity controls */}
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l text-gray-600"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value > 0) handleQuantityChange(item.product.id, value);
                          }}
                          className="w-12 h-8 text-center border-t border-b border-gray-300 focus:outline-none"
                        />
                        <button 
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r text-gray-600"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove button */}
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-500 hover:text-red-600 flex items-center"
                      >
                        <Trash2 size={18} className="mr-1" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <ArrowLeft size={18} className="mr-1" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            {/* Summary details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-base text-gray-600">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base text-gray-600">
                <span>Delivery Fee</span>
                <span>$4.99</span>
              </div>
              <div className="flex justify-between text-base text-gray-600">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-medium text-gray-900">
                <span>Total</span>
                <span>${(getTotalPrice() + 4.99 + getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
            </div>
            
            {/* Delivery address */}
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                id="address"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>
            
            {/* Checkout button */}
            <Button
              variant="primary"
              size="large"
              fullWidth
              icon={<ArrowRight size={18} />}
              onClick={() => navigate('/checkout')}
              disabled={!deliveryAddress.trim()}
            >
              Proceed to Checkout
            </Button>
            
            <p className="text-xs text-gray-500 mt-4">
              By proceeding, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;