import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, ShoppingCart, User, Menu, X, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLocation as useUserLocation } from '../../context/LocationContext';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { getTotalItems } = useCart();
  const { location } = useUserLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine if we're on the search page
  const isSearchPage = pathname === '/search';

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">LocalMart</span>
          </Link>

          {/* Search Bar - Hidden on mobile unless on search page */}
          <div className="hidden md:block flex-grow max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="🔍 What are you looking for?"
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </form>
          </div>

          {/* Location & Cart - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
              <MapPin size={20} className="mr-1" />
              <span className="text-sm">{location?.city || 'Set Location'}</span>
            </div>
            
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-700 hover:text-blue-600" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            <Link to="/profile">
              <User size={24} className="text-gray-700 hover:text-blue-600" />
            </Link>

            {/* Become a Seller button */}
            <Link 
              to="/seller-portal" 
              className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Store size={18} />
              <span className="text-sm font-medium">Become a Seller</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="🔍 What are you looking for?"
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center text-gray-700">
                <MapPin size={20} className="mr-2" />
                <span>{location?.city || 'Set Location'}</span>
              </div>
              
              <Link to="/cart" className="flex items-center text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <ShoppingCart size={20} className="mr-2" />
                <span>Cart ({getTotalItems()})</span>
              </Link>
              
              <Link to="/profile" className="flex items-center text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <User size={20} className="mr-2" />
                <span>Profile</span>
              </Link>

              {/* Mobile Become a Seller button */}
              <Link 
                to="/seller-portal" 
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Store size={18} />
                <span className="font-medium">Become a Seller</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;