import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus, Clock, MapPin, Store, Truck, Package, ArrowLeft } from 'lucide-react';
import ReviewForm from '../components/ui/ReviewForm';
import { Product, Review } from '../types';
import { products, reviews } from '../data/mockData';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = products.find(p => p.id === productId);
  const productReviews = reviews.filter(r => r.productId === productId);
  const shop = product?.shop;
  const shopProducts = products.filter(p => p.shop?.id === shop?.id && p.id !== productId);

  const handleReviewSubmit = (review: { rating: number; comment: string; images: File[] }) => {
    const newReview: Review = {
      id: (reviews.length + 1).toString(),
      productId: productId!,
      userId: '1', // This would come from the logged-in user
      userName: 'Current User',
      rating: review.rating,
      comment: review.comment,
      createdAt: new Date().toISOString(),
      images: review.images.map(file => URL.createObjectURL(file))
    };
    // In a real app, you would send this to your backend
    console.log('New review:', newReview);
    setShowReviewForm(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>

          {/* Shop Information */}
          {shop && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Store className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="font-medium">{shop.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  shop.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {shop.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{shop.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>Rating: {shop.rating} ({shop.distance}km away)</span>
              </div>
            </div>
          )}

          {/* Delivery Options */}
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium text-gray-900 mb-3">Delivery Options</h3>
            <div className="space-y-3">
              {product.deliveryAvailable && (
                <div className="flex items-center text-gray-600">
                  <Truck className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>Delivery Available</span>
                </div>
              )}
              {product.pickupAvailable && (
                <div className="flex items-center text-gray-600">
                  <Package className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>Pickup Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setShowReviews(!showReviews)}
                  className="text-yellow-400 hover:text-yellow-500"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= Math.round(productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length)
                        ? 'fill-current'
                        : ''
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-gray-600">
              ({productReviews.length} reviews)
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <p className="text-sm text-gray-500">In stock</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Write Review Button */}
          <button
            onClick={() => setShowReviewForm(true)}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {showReviews && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
          <div className="space-y-6">
            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{review.userName}</p>
                        <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-4">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      )}

      {/* Related Products from Same Shop */}
      {shopProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More from {shop?.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shopProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{relatedProduct.name}</h3>
                  <p className="text-indigo-600 font-semibold mt-1">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <ReviewForm
              onSubmit={handleReviewSubmit}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage; 