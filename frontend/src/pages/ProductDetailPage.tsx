import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Heart, Store, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { products, reviews } from '../data/mockData';
import { Product, Review } from '../types';

const ProductDetailPage: React.FC = (): JSX.Element => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Add scroll to top hook
  useScrollToTop();

  // Get product from navigation state or find it in the products array
  const product = location.state?.product || products.find((p: Product) => p.id === productId);

  // Get reviews for this product
  const productReviews = reviews.filter((review: Review) => review.productId === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center">
              <Store className="w-5 h-5 mr-2" />
              <span className={`text-sm font-medium ${
                product.shop.isOpen ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.shop.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>

          <div className="flex items-center mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 border rounded-l-lg"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 border-t border-b">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 border rounded-r-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <Button
            onClick={() => addToCart(product, quantity)}
            className="w-full flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        {/* Overall Rating */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">
              {product.rating.toFixed(1)}
            </span>
            <span className="ml-2 text-gray-600">
              ({productReviews.length} reviews)
            </span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {productReviews.map((review: Review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{review.userName}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < review.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* No Reviews Message */}
        {productReviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage; 