import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortDesc, SortAsc, MapPin, Truck, Store } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { searchProducts, getProductsByCategory, getNearbyStores } from '../data/mockData';
import { Product, Category, Shop } from '../types';
import { useLocation } from '../context/LocationContext';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') as Category | null;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Shop[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<'price_asc' | 'price_desc' | 'distance' | 'rating'>('distance');
  const [filterOptions, setFilterOptions] = useState({
    delivery: false,
    pickup: false,
    maxPrice: 1000,
    minRating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const { location, isLoading, error, detectLocation } = useLocation();

  // Fetch products or stores based on search query, category, or location
  useEffect(() => {
    if (query) {
      const results = searchProducts(query);
      setProducts(results);
      setFilteredProducts(results);
      setStores([]);
    } else if (categoryParam) {
      const results = getProductsByCategory(categoryParam);
      setProducts(results);
      setFilteredProducts(results);
      setStores([]);
    } else {
      // If no query or category, fetch nearby stores
      if (location) {
        console.log('Fetching nearby stores with location:', location);
        const userLocation = { lat: location.latitude, lng: location.longitude };
        const nearbyStores = getNearbyStores(userLocation);
        console.log('Found nearby stores:', nearbyStores);
        setStores(nearbyStores);
        setProducts([]);
        setFilteredProducts([]);
      } else {
        console.log('No location available, showing all products');
        const results = getProductsByCategory('all');
        setProducts(results);
        setFilteredProducts(results);
        setStores([]);
      }
    }
  }, [query, categoryParam, location]);

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {query ? `Search Results for "${query}"` : 
           categoryParam ? `${categoryParam} Products` :
           'Nearby Stores'}
        </h1>
        {products.length > 0 && (
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
        )}
      </div>

      {/* Show loading state */}
      {isLoading && !query && !categoryParam && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading nearby stores...</p>
        </div>
      )}

      {/* Show error state */}
      {error && !query && !categoryParam && (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button variant="primary" onClick={detectLocation}>
            Retry Location Detection
          </Button>
        </div>
      )}

      {/* Display stores if no query/category */}
      {stores.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                  <p className="text-gray-600 mt-1">{store.address}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-gray-600">{store.distance.toFixed(1)} km</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">{store.rating}</span>
                </div>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => window.location.href = `/shop/${store.id}`}
                >
                  View Store
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show no results message */}
      {!isLoading && !error && products.length === 0 && stores.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stores Found Nearby</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any stores in your immediate area. Here are some options:
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                size="large"
                className="w-full"
                onClick={() => {
                  // Increase search radius by updating location context
                  detectLocation();
                }}
              >
                Search in a Larger Area
              </Button>
              <Button
                variant="outline"
                size="large"
                className="w-full"
                onClick={() => {
                  // Navigate to all stores view
                  window.location.href = '/search?category=all';
                }}
              >
                View All Stores
              </Button>
              <Button
                variant="outline"
                size="large"
                className="w-full"
                onClick={() => {
                  // Navigate to categories
                  window.location.href = '/';
                }}
              >
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Display products if there's a query/category */}
      {products.length > 0 && (
        <>
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;