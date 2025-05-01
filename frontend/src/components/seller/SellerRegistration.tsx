import React, { useState } from 'react';

interface SellerRegistrationProps {
  onComplete: () => void;
}

const SellerRegistration: React.FC<SellerRegistrationProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    storeName: '',
    storeDescription: '',
    address: '',
    phoneNumber: '',
    email: '',
    deliveryOptions: {
      delivery: false,
      deliveryBoyName: '',
      deliveryBoyAddress: '',
      pickup: false,
    },
    operatingHours: {
      openTime: '',
      closeTime: '',
      openAllDays: false,
      operatingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      }
    },
    businessType: '',
    taxId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name.startsWith('operatingDays.')) {
        const day = name.split('.')[1];
        setFormData(prev => ({
          ...prev,
          operatingHours: {
            ...prev.operatingHours,
            operatingDays: {
              ...prev.operatingHours.operatingDays,
              [day]: checkbox.checked
            }
          }
        }));
      } else if (name === 'openAllDays') {
        setFormData(prev => ({
          ...prev,
          operatingHours: {
            ...prev.operatingHours,
            openAllDays: checkbox.checked,
            operatingDays: {
              monday: checkbox.checked,
              tuesday: checkbox.checked,
              wednesday: checkbox.checked,
              thursday: checkbox.checked,
              friday: checkbox.checked,
              saturday: checkbox.checked,
              sunday: checkbox.checked,
            }
          }
        }));
      } else if (name === 'delivery' || name === 'pickup') {
        setFormData(prev => ({
          ...prev,
          deliveryOptions: {
            ...prev.deliveryOptions,
            [name]: checkbox.checked
          }
        }));
      }
    } else if (name.startsWith('deliveryOptions.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        deliveryOptions: {
          ...prev.deliveryOptions,
          [field]: value
        }
      }));
    } else if (name.startsWith('operatingHours.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        operatingHours: {
          ...prev.operatingHours,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
          Store Name
        </label>
        <input
          type="text"
          id="storeName"
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">
          Store Description
        </label>
        <textarea
          id="storeDescription"
          name="storeDescription"
          value={formData.storeDescription}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Store Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery & Pickup Options</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="delivery"
              name="delivery"
              checked={formData.deliveryOptions.delivery}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="delivery" className="ml-2 block text-sm text-gray-900">
              Delivery Available
            </label>
          </div>

          {formData.deliveryOptions.delivery && (
            <div className="ml-6 space-y-4">
              <div>
                <label htmlFor="deliveryBoyName" className="block text-sm font-medium text-gray-700">
                  Delivery Boy Name
                </label>
                <input
                  type="text"
                  id="deliveryBoyName"
                  name="deliveryOptions.deliveryBoyName"
                  value={formData.deliveryOptions.deliveryBoyName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="deliveryBoyAddress" className="block text-sm font-medium text-gray-700">
                  Delivery Boy Address
                </label>
                <input
                  type="text"
                  id="deliveryBoyAddress"
                  name="deliveryOptions.deliveryBoyAddress"
                  value={formData.deliveryOptions.deliveryBoyAddress}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="pickup"
              name="pickup"
              checked={formData.deliveryOptions.pickup}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="pickup" className="ml-2 block text-sm text-gray-900">
              Pickup Available
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Operating Hours</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="openTime" className="block text-sm font-medium text-gray-700">
                Opening Time
              </label>
              <input
                type="time"
                id="openTime"
                name="operatingHours.openTime"
                value={formData.operatingHours.openTime}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="closeTime" className="block text-sm font-medium text-gray-700">
                Closing Time
              </label>
              <input
                type="time"
                id="closeTime"
                name="operatingHours.closeTime"
                value={formData.operatingHours.closeTime}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="openAllDays"
              name="openAllDays"
              checked={formData.operatingHours.openAllDays}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="openAllDays" className="ml-2 block text-sm text-gray-900">
              Open All Days
            </label>
          </div>

          {!formData.operatingHours.openAllDays && (
            <div className="ml-6 space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Select Operating Days</h4>
              {Object.entries(formData.operatingHours.operatingDays).map(([day, isOpen]) => (
                <div key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`operatingDays.${day}`}
                    name={`operatingDays.${day}`}
                    checked={isOpen}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`operatingDays.${day}`} className="ml-2 block text-sm text-gray-900">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
          Business Type
        </label>
        <select
          id="businessType"
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Business Type</option>
          <option value="individual">Individual</option>
          <option value="partnership">Partnership</option>
          <option value="corporation">Corporation</option>
        </select>
      </div>

      <div>
        <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
          Tax ID
        </label>
        <input
          type="text"
          id="taxId"
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register Store
        </button>
      </div>
    </form>
  );
};

export default SellerRegistration; 