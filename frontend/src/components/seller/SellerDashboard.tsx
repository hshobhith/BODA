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
  Trash2,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import AddProduct from './AddProduct';
import SellerSettings from './SellerSettings';

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

interface Order {
  id: number;
  customer: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  date: string;
  items: {
    productId: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface StoreImage {
  id: number;
  url: string;
  isPrimary: boolean;
}

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [storeImages, setStoreImages] = useState<StoreImage[]>([
    { id: 1, url: 'https://via.placeholder.com/400x300', isPrimary: true },
    { id: 2, url: 'https://via.placeholder.com/400x300', isPrimary: false },
    { id: 3, url: 'https://via.placeholder.com/400x300', isPrimary: false },
  ]);
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 29.99, stock: 15, sales: 45 },
    { id: 2, name: 'Product 2', price: 49.99, stock: 8, sales: 32 },
    { id: 3, name: 'Product 3', price: 19.99, stock: 20, sales: 28 },
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customer: 'John Doe',
      amount: 120,
      status: 'Delivered',
      date: '2024-03-15',
      items: [
        { productId: 1, name: 'Product 1', quantity: 2, price: 29.99 },
        { productId: 2, name: 'Product 2', quantity: 1, price: 49.99 }
      ]
    },
    {
      id: 2,
      customer: 'Jane Smith',
      amount: 85,
      status: 'Processing',
      date: '2024-03-14',
      items: [
        { productId: 3, name: 'Product 3', quantity: 3, price: 19.99 }
      ]
    }
  ]);
  const [sellerData, setSellerData] = useState({
    storeName: 'My Store',
    storeDescription: 'A great store with amazing products',
    address: '123 Main St, City, Country',
    phoneNumber: '+1234567890',
    email: 'store@example.com',
    deliveryOptions: {
      delivery: true,
      deliveryBoyName: 'John Doe',
      deliveryBoyAddress: '456 Delivery St, City, Country',
      pickup: true,
    },
    operatingHours: {
      openTime: '09:00',
      closeTime: '18:00',
      openAllDays: false,
      operatingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      }
    },
  });

  const handleSaveSettings = (newData: any) => {
    setSellerData(newData);
    // Here you would typically send the data to your backend
    console.log('Settings saved:', newData);
  };

  const handleAddProduct = (newProduct: {
    name: string;
    price: number;
    description: string;
    category: string;
    discountPrice: number;
    barcode: string;
    images: File[];
    stock: number;
  }) => {
    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
      sales: 0,
      description: newProduct.description,
      category: newProduct.category,
      discountPrice: newProduct.discountPrice,
      barcode: newProduct.barcode,
      images: newProduct.images.map(file => URL.createObjectURL(file)),
    };
    setProducts([...products, product]);
    setShowAddProduct(false);
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImage: StoreImage = {
        id: storeImages.length + 1,
        url: URL.createObjectURL(event.target.files[0]),
        isPrimary: false
      };
      setStoreImages([...storeImages, newImage]);
    }
  };

  const setPrimaryImage = (imageId: number) => {
    setStoreImages(storeImages.map(img => ({
      ...img,
      isPrimary: img.id === imageId
    })));
  };

  return (
    <div className="space-y-6">
      {/* Store Images Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Store Images</h2>
          <label className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer">
            <ImageIcon className="h-5 w-5 mr-2" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {storeImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={`Store image ${image.id}`}
                className={`w-full h-48 object-cover rounded-lg ${
                  image.isPrimary ? 'ring-2 ring-indigo-500' : ''
                }`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setPrimaryImage(image.id)}
                  className={`px-3 py-1 rounded-md ${
                    image.isPrimary
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {image.isPrimary ? 'Primary' : 'Set as Primary'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full">
              <DollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-900">$12,500</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-semibold text-gray-900">89</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-lg shadow">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex border-b border-gray-200">
            <Tab
              className={({ selected }) =>
                `px-6 py-3 text-sm font-medium border-b-2 ${
                  selected
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              Settings
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-6 py-3 text-sm font-medium border-b-2 ${
                  selected
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              Products
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-6 py-3 text-sm font-medium border-b-2 ${
                  selected
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              Orders
            </Tab>
          </Tab.List>

          <Tab.Panels className="p-6">
            {/* Settings Panel */}
            <Tab.Panel>
              <SellerSettings initialData={sellerData} onSave={handleSaveSettings} />
            </Tab.Panel>

            {/* Products Panel */}
            <Tab.Panel>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Products Management</h2>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Product
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
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
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            {product.description && (
                              <div className="text-sm text-gray-500">{product.description}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${product.price}</div>
                            {product.discountPrice && (
                              <div className="text-sm text-red-600 line-through">${product.discountPrice}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock}
                            </span>
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
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Orders Management</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                              className={`text-sm font-medium rounded-full px-2 py-1 ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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