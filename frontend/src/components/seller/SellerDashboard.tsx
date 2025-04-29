import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock,
  Star,
  Edit,
  Trash2
} from 'lucide-react';
import AddProduct from './AddProduct';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sales: number;
  description?: string;
  category?: string;
  discountPrice?: number;
  barcode?: string;
  images?: string[];
}

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 29.99, stock: 15, sales: 45 },
    { id: 2, name: 'Product 2', price: 49.99, stock: 8, sales: 32 },
    { id: 3, name: 'Product 3', price: 19.99, stock: 20, sales: 28 },
  ]);

  // Mock data - in a real app, this would come from your backend
  const dashboardStats = {
    totalSales: 1250,
    totalOrders: 45,
    totalProducts: 12,
    averageRating: 4.5,
    activeCustomers: 89,
    pendingOrders: 3
  };

  const recentOrders = [
    { id: 1, customer: 'John Doe', amount: 120, status: 'Delivered', date: '2024-03-15' },
    { id: 2, customer: 'Jane Smith', amount: 85, status: 'Processing', date: '2024-03-14' },
    { id: 3, customer: 'Bob Johnson', amount: 200, status: 'Pending', date: '2024-03-14' },
  ];

  const handleAddProduct = (newProduct: {
    name: string;
    price: number;
    description: string;
    category: string;
    discountPrice: number;
    barcode: string;
    images: File[];
  }) => {
    // In a real app, you would upload the images to your server first
    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: newProduct.price,
      stock: 0, // Initial stock
      sales: 0, // Initial sales
      description: newProduct.description,
      category: newProduct.category,
      discountPrice: newProduct.discountPrice,
      barcode: newProduct.barcode,
      // Convert File objects to URLs for preview
      images: newProduct.images.map(file => URL.createObjectURL(file)),
    };

    setProducts(prev => [...prev, product]);
    setShowAddProduct(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full">
              <DollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-900">${dashboardStats.totalSales}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.averageRating}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.activeCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardStats.pendingOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for detailed views */}
      <div className="border-t border-gray-200">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex space-x-8 px-6 py-4">
            <Tab
              className={({ selected }: { selected: boolean }) =>
                `px-3 py-2 text-sm font-medium rounded-md ${
                  selected
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              Products
            </Tab>
            <Tab
              className={({ selected }: { selected: boolean }) =>
                `px-3 py-2 text-sm font-medium rounded-md ${
                  selected
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              Orders
            </Tab>
            <Tab
              className={({ selected }: { selected: boolean }) =>
                `px-3 py-2 text-sm font-medium rounded-md ${
                  selected
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              Analytics
            </Tab>
          </Tab.List>

          <Tab.Panels className="p-6">
            {/* Products Panel */}
            <Tab.Panel>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Manage Products</h2>
                  <button 
                    onClick={() => setShowAddProduct(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Add New Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {product.images?.[0] && (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-10 w-10 rounded-full object-cover mr-3"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                {product.description && (
                                  <div className="text-sm text-gray-500 truncate max-w-xs">
                                    {product.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${product.price}</div>
                            {product.discountPrice && (
                              <div className="text-sm text-red-600 line-through">
                                ${product.discountPrice}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Tab.Panel>

            {/* Orders Panel */}
            <Tab.Panel>
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${order.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Tab.Panel>

            {/* Analytics Panel */}
            <Tab.Panel>
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Sales Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Trend</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Sales chart will be displayed here</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Product performance chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {showAddProduct && (
        <AddProduct
          onClose={() => setShowAddProduct(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
};

export default SellerDashboard; 