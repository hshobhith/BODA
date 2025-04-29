import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShopDetailsPage from './pages/ShopDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfilePage from './pages/ProfilePage';
import SellerPortal from './pages/SellerPortal';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <LocationProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow bg-gray-50">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/product/:productId" element={<ProductDetailsPage />} />
                <Route path="/shop/:shopId" element={<ShopDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
                <Route path="/profile/*" element={<ProfilePage />} />
                <Route path="/seller-portal/*" element={<SellerPortal />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </LocationProvider>
  );
}

export default App;