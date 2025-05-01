import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Store, ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { shops, products } from '../data/mockData';
import { Shop, Product } from '../types';

const ShopDetailsPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Find shop by ID
    const foundShop = shops.find(s => s.id === shopId);
    if (foundShop) {
      setShop(foundShop);
      
      // Find products from this shop
      const productsFromShop = products.filter(p => p.shop.id === shopId);
      setShopProducts(productsFromShop);
    }
  }, [shopId]);

  if (!shop) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p>Loading shop information...</p>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? shop.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === shop.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back
        </button>
      </div>

      {/* Shop Images Carousel */}
      <div className="relative mb-8">
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <img
            src={shop.images[currentImageIndex].url}
            alt={`${shop.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {shop.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="h-6 w-6 rotate-180" />
              </button>
            </>
          )}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {shop.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Shop Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{shop.name}</h1>
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <span>{shop.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{shop.distance.toFixed(1)} km away</span>
          </div>
          <div className="flex items-center">
            <Store className="h-5 w-5 mr-1" />
            <span>{shop.isOpen ? 'Open' : 'Closed'}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{shop.address}</p>
        <div className="flex flex-wrap gap-2">
          {shop.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shopProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsPage; 