import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerLogin from '../components/seller/SellerLogin';
import SellerRegistration from '../components/seller/SellerRegistration';
import SellerDashboard from '../components/seller/SellerDashboard';

const SellerPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Here you would typically verify credentials with your backend
    console.log('Login attempt with:', credentials);
    setIsLoggedIn(true);
  };

  const handleRegistrationComplete = () => {
    setIsLoggedIn(true);
    setIsRegistering(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isLoggedIn ? (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Seller Portal</h1>
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setIsRegistering(false)}
                className={`px-4 py-2 rounded-md ${
                  !isRegistering
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsRegistering(true)}
                className={`px-4 py-2 rounded-md ${
                  isRegistering
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Register
              </button>
            </div>
            {!isRegistering ? (
              <SellerLogin onLogin={handleLogin} onRegister={() => setIsRegistering(true)} />
            ) : (
              <SellerRegistration onComplete={handleRegistrationComplete} />
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
            <SellerDashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerPortal; 