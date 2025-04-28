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

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ChevronLeft size={18} className="mr-1" />
        <span>Back</span>
      </button>

      {/* Shop header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-start">
          <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center mr-6">
            <Store size={32} className="text-gray-400" />
          </div>
          
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {shop.name}
            </h1>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star size={18} className="text-yellow-400" />
                <span className="ml-1 text-gray-700">{shop.rating.toFixed(1)}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{shop.address}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {shop.categories.map(category => (
                <span 
                  key={category}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop products */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Available Products
        </h2>

        {shopProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shopProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                displayCategory={true} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products available in this shop yet.</p>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Back to Shops
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopDetailsPage; 