import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortDesc, SortAsc, MapPin, Truck, Store } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { searchProducts, getProductsByCategory } from '../data/mockData';
import { Product, Category } from '../types';
import { useLocation } from '../context/LocationContext';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') as Category | null;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<'price_asc' | 'price_desc' | 'distance' | 'rating'>('distance');
  const [filterOptions, setFilterOptions] = useState({
    delivery: false,
    pickup: false,
    maxPrice: 1000,
    minRating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const { location } = useLocation();

  // Fetch products based on search query or category
  useEffect(() => {
    let results: Product[];
    
    if (query) {
      results = searchProducts(query);
    } else if (categoryParam) {
      results = getProductsByCategory(categoryParam);
    } else {
      results = getProductsByCategory('all');
    }
    
    setProducts(results);
    setFilteredProducts(results);
  }, [query, categoryParam]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];
    
    // Apply delivery/pickup filters
    if (filterOptions.delivery) {
      filtered = filtered.filter(p => p.deliveryAvailable);
    }
    
    if (filterOptions.pickup) {
      filtered = filtered.filter(p => p.pickupAvailable);
    }
    
    // Apply price filter
    filtered = filtered.filter(p => p.price <= filterOptions.maxPrice);
    
    // Apply rating filter
    filtered = filtered.filter(p => p.rating >= filterOptions.minRating);
    
    // Apply sorting
    switch (sortOption) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'distance':
        filtered.sort((a, b) => a.shop.distance - b.shop.distance);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, filterOptions, sortOption]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({
      ...filterOptions,
      maxPrice: parseInt(e.target.value),
    });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({
      ...filterOptions,
      minRating: parseInt(e.target.value),
    });
  };

  const clearFilters = () => {
    setFilterOptions({
      delivery: false,
      pickup: false,
      maxPrice: 1000,
      minRating: 0,
    });
    setSortOption('distance');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header with search info */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {query 
            ? `Search results for "${query}"` 
            : categoryParam 
              ? `Browse ${categoryParam}` 
              : 'All Products'
          }
        </h1>
        
        {location && (
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>Showing results near {location.city}</span>
          </div>
        )}
      </div>

      {/* Filters and sort controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <Button 
            variant="outline"
            size="small"
            icon={<Filter size={16} />}
            onClick={toggleFilters}
            className="mb-2 sm:mb-0"
          >
            Filters
          </Button>
          
          <div className="flex space-x-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="distance">Distance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Expandable filter options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Fulfillment Options</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filterOptions.delivery}
                    onChange={() => setFilterOptions({...filterOptions, delivery: !filterOptions.delivery})}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 flex items-center">
                    <Truck size={16} className="mr-1.5" />
                    Delivery Available
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filterOptions.pickup}
                    onChange={() => setFilterOptions({...filterOptions, pickup: !filterOptions.pickup})}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 flex items-center">
                    <Store size={16} className="mr-1.5" />
                    Pickup Available
                  </span>
                </label>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">$0</span>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filterOptions.maxPrice}
                    onChange={handlePriceChange}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-gray-700 ml-2">${filterOptions.maxPrice}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">0</span>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={filterOptions.minRating}
                    onChange={handleRatingChange}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-gray-700 ml-2">{filterOptions.minRating} ★</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline"
              size="small"
              onClick={clearFilters}
              className="col-span-1 md:col-span-2 w-auto md:w-fit"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 text-gray-600">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </div>

      {/* Results grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} displayCategory={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </main>
  );
};

export default SearchResultsPage;