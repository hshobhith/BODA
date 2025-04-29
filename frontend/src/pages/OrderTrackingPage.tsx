import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, MapPin, Truck, PackageCheck, Store, QrCode, Phone, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

interface OrderStatus {
  step: 'placed' | 'confirmed' | 'out_for_delivery' | 'delivered';
  title: string;
  description: string;
  time: string;
  completed: boolean;
}

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPickup, setIsPickup] = useState(false);
  
  // Simulate order progress
  useEffect(() => {
    // For demo purposes, advance the order status every few seconds
    const interval = setInterval(() => {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentStep]);

  // For demo purposes, randomly choose pickup or delivery
  useEffect(() => {
    setIsPickup(Math.random() > 0.5);
  }, []);

  const orderStatuses: OrderStatus[] = isPickup
    ? [
        {
          step: 'placed',
          title: 'Order Placed',
          description: 'Your order has been received',
          time: '10:30 AM',
          completed: currentStep >= 1,
        },
        {
          step: 'confirmed',
          title: 'Order Confirmed',
          description: 'Shop is preparing your items',
          time: '10:35 AM',
          completed: currentStep >= 2,
        },
        {
          step: 'out_for_delivery',
          title: 'Ready for Pickup',
          description: 'Your order is ready for collection',
          time: '11:00 AM',
          completed: currentStep >= 3,
        },
        {
          step: 'delivered',
          title: 'Order Completed',
          description: 'You have picked up your order',
          time: '11:30 AM',
          completed: currentStep >= 4,
        },
      ]
    : [
        {
          step: 'placed',
          title: 'Order Placed',
          description: 'Your order has been received',
          time: '10:30 AM',
          completed: currentStep >= 1,
        },
        {
          step: 'confirmed',
          title: 'Order Confirmed',
          description: 'Shop is preparing your items',
          time: '10:35 AM',
          completed: currentStep >= 2,
        },
        {
          step: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Your order is on the way',
          time: '11:00 AM',
          completed: currentStep >= 3,
        },
        {
          step: 'delivered',
          title: 'Order Delivered',
          description: 'Your order has been delivered',
          time: '11:30 AM',
          completed: currentStep >= 4,
        },
      ];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 mb-6">
        <ArrowLeft size={18} className="mr-1" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">Order Status</h1>
          <div className="text-sm font-medium text-gray-600">
            Order #{orderId}
          </div>
        </div>
        
        {/* Progress tracker */}
        <div className="mb-8">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-5 top-0 w-0.5 h-full bg-gray-200" aria-hidden="true"></div>
            
            {/* Steps */}
            <div className="relative space-y-8">
              {orderStatuses.map((status, index) => (
                <div key={status.step} className="flex items-start">
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    status.completed 
                      ? 'border-green-500 bg-green-500 text-white' 
                      : 'border-gray-300 bg-white'
                  } z-10`}>
                    {status.completed ? (
                      <Check size={18} />
                    ) : (
                      <span className="text-gray-500">{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className={`font-medium ${status.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {status.title}
                    </h3>
                    <p className="text-sm text-gray-500">{status.description}</p>
                    {status.completed && (
                      <p className="text-xs text-gray-400 mt-1">{status.time}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content based on fulfillment type */}
        {isPickup ? (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start mb-6">
              <Store size={24} className="text-blue-600 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Pickup Details</h3>
                <p className="text-gray-600 mt-1">SuperMart</p>
                <p className="text-gray-600">123 Main St, Downtown</p>
                <p className="text-gray-600 text-sm">Open until 9:00 PM</p>
              </div>
            </div>
            
            {currentStep >= 3 && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex">
                  <QrCode size={60} className="text-blue-600" />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Pickup QR Code</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Show this QR code to the store staff when you collect your order
                    </p>
                    <Button
                      variant="outline"
                      size="small"
                    >
                      Enlarge QR Code
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="medium"
                icon={<MapPin size={18} />}
              >
                View Store Location
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start mb-6">
              <MapPin size={24} className="text-blue-600 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Delivery Address</h3>
                <p className="text-gray-600 mt-1">123 Home St, Apartment 4B</p>
                <p className="text-gray-600">New York, NY 10001</p>
              </div>
            </div>
            
            {currentStep >= 3 && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex">
                  <Truck size={24} className="text-blue-600 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Delivery Details</h3>
                    <p className="text-sm text-gray-600">Estimated arrival in 15-20 minutes</p>
                    <div className="flex items-center mt-2">
                      <img 
                        src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Delivery Person" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">John D.</p>
                        <p className="text-xs text-gray-500">Your Delivery Partner</p>
                      </div>
                      <Button
                        variant="outline"
                        size="small"
                        icon={<Phone size={14} />}
                        className="ml-auto"
                      >
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              {currentStep >= 3 && (
                <Button
                  variant="primary"
                  size="medium"
                  icon={<PackageCheck size={18} />}
                >
                  Track on Map
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Order summary card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        
        <div className="divide-y divide-gray-200">
          <div className="py-3 flex">
            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg"
                alt="Smartphone X"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">Smartphone X</h3>
              <p className="text-sm text-gray-500">Qty: 1</p>
              <p className="text-sm font-medium text-gray-900 mt-1">$699.99</p>
            </div>
          </div>
          
          <div className="py-3 flex">
            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg"
                alt="Wireless Headphones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">Wireless Headphones</h3>
              <p className="text-sm text-gray-500">Qty: 1</p>
              <p className="text-sm font-medium text-gray-900 mt-1">$149.99</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Subtotal</span>
            <span>$849.98</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Delivery Fee</span>
            <span>{isPickup ? 'FREE' : '$4.99'}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Tax</span>
            <span>$85.00</span>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <span>Total</span>
            <span>${isPickup ? '934.98' : '939.97'}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            variant="outline"
            size="medium"
            fullWidth
          >
            View Order Details
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OrderTrackingPage;