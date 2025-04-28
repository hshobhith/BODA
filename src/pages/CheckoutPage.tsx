import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, DollarSign, Check, MapPin, Truck, Store } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

type PaymentMethod = 'card' | 'upi' | 'wallet' | 'cash';
type FulfillmentMethod = 'delivery' | 'pickup';

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FulfillmentMethod>('delivery');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOrderProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      // In a real app, we would send the order to an API
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Clear the cart
      clearCart();
      
      // Navigate to order confirmation
      navigate(`/order-tracking/${orderId}`);
    }, 2000);
  };

  const subtotal = getTotalPrice();
  const deliveryFee = fulfillmentMethod === 'delivery' ? 4.99 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryFee + tax;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Fulfillment options */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">How would you like to get your order?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setFulfillmentMethod('delivery')}
                className={`flex items-center p-4 rounded-lg border ${
                  fulfillmentMethod === 'delivery' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-300'
                }`}
              >
                <Truck size={24} className={fulfillmentMethod === 'delivery' ? 'text-blue-600' : 'text-gray-600'} />
                <div className="ml-4 text-left">
                  <div className={fulfillmentMethod === 'delivery' ? 'font-medium text-blue-600' : 'font-medium text-gray-700'}>
                    Delivery
                  </div>
                  <div className="text-sm text-gray-500">Get it delivered to your doorstep</div>
                </div>
              </button>

              <button
                onClick={() => setFulfillmentMethod('pickup')}
                className={`flex items-center p-4 rounded-lg border ${
                  fulfillmentMethod === 'pickup' 
                    ? 'border-orange-600 bg-orange-50' 
                    : 'border-gray-300'
                }`}
              >
                <Store size={24} className={fulfillmentMethod === 'pickup' ? 'text-orange-600' : 'text-gray-600'} />
                <div className="ml-4 text-left">
                  <div className={fulfillmentMethod === 'pickup' ? 'font-medium text-orange-600' : 'font-medium text-gray-700'}>
                    Pickup
                  </div>
                  <div className="text-sm text-gray-500">Pick up from the store (save on delivery fees)</div>
                </div>
              </button>
            </div>

            {fulfillmentMethod === 'delivery' && (
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 mb-2">Delivery Address</h3>
                <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                  <MapPin size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-gray-700">123 Main Street, Apt 4B</p>
                    <p className="text-gray-700">New York, NY 10001</p>
                    <button className="text-blue-600 text-sm mt-1 hover:underline">
                      Change address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {fulfillmentMethod === 'pickup' && (
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 mb-2">Pickup Locations</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="bg-gray-50 p-3 rounded-lg flex items-start">
                      <Store size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">{item.product.shop.name}</p>
                        <p className="text-gray-700">{item.product.shop.address}</p>
                        <p className="text-gray-600 text-sm">
                          {item.product.shop.distance.toFixed(1)} km away • Ready for pickup in ~30 minutes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Payment options */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
            
            <div className="space-y-3">
              <div
                className={`flex items-center p-3 rounded-lg border ${
                  paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                } cursor-pointer`}
                onClick={() => setPaymentMethod('card')}
              >
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="card" className="ml-3 flex items-center flex-grow cursor-pointer">
                  <CreditCard size={20} className="text-gray-600 mr-2" />
                  <span className="font-medium text-gray-700">Credit/Debit Card</span>
                </label>
              </div>

              <div
                className={`flex items-center p-3 rounded-lg border ${
                  paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                } cursor-pointer`}
                onClick={() => setPaymentMethod('upi')}
              >
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="upi" className="ml-3 flex items-center flex-grow cursor-pointer">
                  <Wallet size={20} className="text-gray-600 mr-2" />
                  <span className="font-medium text-gray-700">UPI</span>
                </label>
              </div>

              <div
                className={`flex items-center p-3 rounded-lg border ${
                  paymentMethod === 'wallet' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                } cursor-pointer`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <input
                  type="radio"
                  id="wallet"
                  name="paymentMethod"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="wallet" className="ml-3 flex items-center flex-grow cursor-pointer">
                  <Wallet size={20} className="text-gray-600 mr-2" />
                  <span className="font-medium text-gray-700">Digital Wallet</span>
                </label>
              </div>

              {fulfillmentMethod === 'pickup' && (
                <div
                  className={`flex items-center p-3 rounded-lg border ${
                    paymentMethod === 'cash' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  } cursor-pointer`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="cash" className="ml-3 flex items-center flex-grow cursor-pointer">
                    <DollarSign size={20} className="text-gray-600 mr-2" />
                    <span className="font-medium text-gray-700">Cash on Pickup</span>
                  </label>
                </div>
              )}
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      placeholder="MM/YY"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="123"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            {/* Items summary */}
            <div className="mb-6 max-h-64 overflow-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Summary details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-base text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base text-gray-600">
                <span>Delivery Fee</span>
                <span>{fulfillmentMethod === 'delivery' ? `$${deliveryFee.toFixed(2)}` : 'FREE'}</span>
              </div>
              <div className="flex justify-between text-base text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-medium text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Checkout button */}
            <Button
              variant="primary"
              size="large"
              fullWidth
              icon={<Check size={18} />}
              onClick={handleCheckout}
              disabled={orderProcessing}
            >
              {orderProcessing ? 'Processing...' : 'Place Order'}
            </Button>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Customer satisfaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;