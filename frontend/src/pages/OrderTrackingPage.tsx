import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, MapPin, Truck, PackageCheck, Store, QrCode, Phone, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

interface OrderStatus {
  step: 'placed' | 'confirmed' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'completed';
  title: string;
  description: string;
  time: string;
  completed: boolean;
  icon: React.ReactNode;
}

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { items } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPickup, setIsPickup] = useState(false);
  
  // Determine if order is pickup based on cart items
  useEffect(() => {
    const hasPickupItems = items.some(item => item.deliveryMethod === 'pickup');
    setIsPickup(hasPickupItems);
  }, [items]);

  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentStep]);

  const orderStatuses: OrderStatus[] = isPickup
    ? [
        {
          step: 'placed',
          title: 'Order Placed',
          description: 'Your order has been received',
          time: '10:30 AM',
          completed: currentStep >= 1,
          icon: <PackageCheck size={20} />
        },
        {
          step: 'confirmed',
          title: 'Order Confirmed',
          description: 'Shop is preparing your items',
          time: '10:35 AM',
          completed: currentStep >= 2,
          icon: <Check size={20} />
        },
        {
          step: 'ready_for_pickup',
          title: 'Ready for Pickup',
          description: 'Your order is ready for collection',
          time: '11:00 AM',
          completed: currentStep >= 3,
          icon: <Store size={20} />
        },
        {
          step: 'completed',
          title: 'Order Completed',
          description: 'You have picked up your order',
          time: '11:30 AM',
          completed: currentStep >= 4,
          icon: <Check size={20} />
        },
      ]
    : [
        {
          step: 'placed',
          title: 'Order Placed',
          description: 'Your order has been received',
          time: '10:30 AM',
          completed: currentStep >= 1,
          icon: <PackageCheck size={20} />
        },
        {
          step: 'confirmed',
          title: 'Order Confirmed',
          description: 'Shop is preparing your items',
          time: '10:35 AM',
          completed: currentStep >= 2,
          icon: <Check size={20} />
        },
        {
          step: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Your order is on the way',
          time: '11:00 AM',
          completed: currentStep >= 3,
          icon: <Truck size={20} />
        },
        {
          step: 'delivered',
          title: 'Order Delivered',
          description: 'Your order has been delivered',
          time: '11:30 AM',
          completed: currentStep >= 4,
          icon: <Check size={20} />
        },
      ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/orders" className="flex items-center text-gray-600 hover:text-blue-600">
          <ArrowLeft size={18} className="mr-2" />
          Back to Orders
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Order #{orderId}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order status */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Status</h2>
            
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
                      status.icon
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
        
        {/* Order details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Details</h2>
            
            {isPickup ? (
              <div className="space-y-6">
                <div className="flex items-center">
                  <Store size={24} className="text-orange-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Pickup Location</h3>
                    <p className="text-sm text-gray-500">Store Name</p>
                    <p className="text-sm text-gray-500">123 Main Street</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <QrCode size={24} className="text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Pickup Code</h3>
                    <p className="text-2xl font-bold text-gray-900">A1B2C3</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone size={24} className="text-green-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Store Contact</h3>
                    <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center">
                  <Truck size={24} className="text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Delivery Status</h3>
                    <p className="text-sm text-gray-500">Your order is on the way</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={24} className="text-red-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Delivery Address</h3>
                    <p className="text-sm text-gray-500">123 Main Street</p>
                    <p className="text-sm text-gray-500">Apartment 4B</p>
                    <p className="text-sm text-gray-500">New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <PackageCheck size={24} className="text-purple-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Estimated Delivery</h3>
                    <p className="text-sm text-gray-500">30-45 minutes</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderTrackingPage;