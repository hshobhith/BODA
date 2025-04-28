import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, CreditCard, LogOut, Settings, Bell, HelpCircle } from 'lucide-react';
import { currentUser, orders } from '../data/mockData';
import Button from '../components/ui/Button';

interface TabProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, icon, active, onClick }) => (
  <button
    className={`flex items-center py-3 px-4 border-b-2 transition-colors ${
      active 
        ? 'border-blue-600 text-blue-600' 
        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Orders</h2>
            
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">Order #{order.id}</div>
                        <div className="text-xs text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        order.status === 'delivered' || order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      {order.products.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center py-2">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">Qty: {quantity}</div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ${(product.price * quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-b-lg flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-900">
                        Total: ${order.total.toFixed(2)}
                      </div>
                      <div>
                        <Link to={`/order-tracking/${order.id}`}>
                          <Button
                            variant="outline"
                            size="small"
                          >
                            Track Order
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                <Link to="/">
                  <Button
                    variant="primary"
                    size="medium"
                  >
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        );
      
      case 'addresses':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Addresses</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentUser.addresses.map((address, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex justify-between">
                    <div className="font-medium text-gray-900 mb-2">
                      {index === 0 ? 'Home' : 'Work'}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-blue-600">
                        <Settings size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-red-600">
                        <LogOut size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600">{address}</p>
                </div>
              ))}
              
              <button className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4 hover:border-blue-400 transition-colors">
                <MapPin size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-700">Add New Address</span>
              </button>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={currentUser.name}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={currentUser.email}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <Button
                  variant="primary"
                  size="medium"
                >
                  Save Changes
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Order status updates</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={true}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Promotional emails</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={false}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Product recommendations</span>
                  </label>
                </div>
                
                <Button
                  variant="outline"
                  size="medium"
                  className="mt-6"
                >
                  Update Preferences
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <User size={36} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">{currentUser.name}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
              
              <Button
                variant="outline"
                size="small"
                className="mt-4"
                icon={<Settings size={16} />}
              >
                Edit Profile
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm">
            <nav className="flex flex-col">
              <button
                className="flex items-center p-4 text-left hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-blue-600 transition-colors"
                onClick={() => setActiveTab('orders')}
              >
                <Package size={20} className="mr-3" />
                <span>My Orders</span>
              </button>
              
              <button
                className="flex items-center p-4 text-left hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-blue-600 transition-colors"
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin size={20} className="mr-3" />
                <span>My Addresses</span>
              </button>
              
              <button
                className="flex items-center p-4 text-left hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-blue-600 transition-colors"
              >
                <CreditCard size={20} className="mr-3" />
                <span>Payment Methods</span>
              </button>
              
              <button
                className="flex items-center p-4 text-left hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-blue-600 transition-colors"
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={20} className="mr-3" />
                <span>Account Settings</span>
              </button>
              
              <button
                className="flex items-center p-4 text-left hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-blue-600 transition-colors"
              >
                <Bell size={20} className="mr-3" />
                <span>Notifications</span>
              </button>
              
              <button
                className="flex items-center p-4 text-left hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-blue-600 transition-colors"
              >
                <HelpCircle size={20} className="mr-3" />
                <span>Help & Support</span>
              </button>
              
              <button
                className="flex items-center p-4 text-left hover:bg-gray-50 text-red-600 hover:text-red-700 border-l-4 border-transparent hover:border-red-600 transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-2">
          {/* Tabs for mobile */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar md:hidden">
            <Tab 
              label="Orders" 
              icon={<Package size={16} />} 
              active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')} 
            />
            <Tab 
              label="Addresses" 
              icon={<MapPin size={16} />} 
              active={activeTab === 'addresses'} 
              onClick={() => setActiveTab('addresses')} 
            />
            <Tab 
              label="Settings" 
              icon={<Settings size={16} />} 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
          </div>
          
          {/* Tab content */}
          {renderTabContent()}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;