import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerRegistration from '../components/seller/SellerRegistration';
import SellerDashboard from '../components/seller/SellerDashboard';

const SellerPage: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isRegistered ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Become a Seller</h1>
            <SellerRegistration onComplete={handleRegistrationComplete} />
          </div>
        ) : (
          <SellerDashboard />
        )}
      </div>
    </div>
  );
};

export default SellerPage; 