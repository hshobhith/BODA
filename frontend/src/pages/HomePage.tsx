import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CategoryList from '../components/ui/CategoryList';
import ProductCard from '../components/ui/ProductCard';
import ShopCard from '../components/ui/ShopCard';
import Carousel from '../components/ui/Carousel';
import Button from '../components/ui/Button';
import { getFeaturedProducts, getFeaturedShops } from '../data/mockData';
import { Product, Shop } from '../types';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredShops, setFeaturedShops] = useState<Shop[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch featured products and shops
    setFeaturedProducts(getFeaturedProducts());
    setFeaturedShops(getFeaturedShops());
  }, []);

  const carouselImages = [
    {
      src: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
      alt: 'Smartphone deals'
    },
    {
      src: 'https://images.pexels.com/photos/47305/bananas-banana-shrub-fruits-yellow-47305.jpeg',
      alt: 'Fresh groceries'
    },
    {
      src: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      alt: 'Fashion collection'
    },
    {
      src: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg',
      alt: 'Electronics'
    }
  ];

  return (
    <main>
      {/* Carousel section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <Carousel images={carouselImages} />
        </div>
      </section>

      {/* Categories section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Browse Categories</h2>
          </div>
          <CategoryList layout="grid" />
        </div>
      </section>

      {/* Featured shops */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Featured Shops Near You</h2>
            <Button 
              variant="outline" 
              size="small"
              icon={<ChevronRight size={16} />}
              onClick={() => navigate('/search')}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Featured Products Near You</h2>
            <Button 
              variant="outline" 
              size="small"
              icon={<ChevronRight size={16} />}
              onClick={() => navigate('/search')}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} displayCategory={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-blue-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Support Local Businesses
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Discover unique products from local shops, support your community, and enjoy the convenience of same-day pickup or quick delivery.
          </p>
          <Button 
            variant="primary" 
            size="large"
            onClick={() => navigate('/search')}
          >
            Explore Nearby Shops
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;