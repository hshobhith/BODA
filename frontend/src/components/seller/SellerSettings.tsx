import React, { useState, useEffect } from 'react';

interface SellerSettingsProps {
  initialData: {
    storeName: string;
    storeDescription: string;
    address: string;
    phoneNumber: string;
    email: string;
    deliveryOptions: {
      delivery: boolean;
      deliveryBoyName: string;
      deliveryBoyAddress: string;
      pickup: boolean;
      deliveryBoyPhone: string;
      pickupCode: string;
    };
    operatingHours: {
      openTime: string;
      closeTime: string;
      openAllDays: boolean;
      operatingDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
      };
    };
  };
  onSave: (data: any) => void;
}

const SellerSettings: React.FC<SellerSettingsProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Store Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isEditing ? 'Cancel' : 'Edit Settings'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
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
              disabled={!isEditing}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>
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
            disabled={!isEditing}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
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
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
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
                disabled={!isEditing}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:bg-gray-100"
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
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="deliveryBoyPhone" className="block text-sm font-medium text-gray-700">
                    Delivery Boy Phone
                  </label>
                  <input
                    type="tel"
                    id="deliveryBoyPhone"
                    name="deliveryOptions.deliveryBoyPhone"
                    value={formData.deliveryOptions.deliveryBoyPhone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
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
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
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
                disabled={!isEditing}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:bg-gray-100"
              />
              <label htmlFor="pickup" className="ml-2 block text-sm text-gray-900">
                Pickup Available
              </label>
            </div>

            {formData.deliveryOptions.pickup && (
              <div className="ml-6 space-y-4">
                <div>
                  <label htmlFor="pickupCode" className="block text-sm font-medium text-gray-700">
                    Pickup Code
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      id="pickupCode"
                      name="deliveryOptions.pickupCode"
                      value={formData.deliveryOptions.pickupCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                        handleChange({
                          target: {
                            name: 'deliveryOptions.pickupCode',
                            value: newCode
                          }
                        } as React.ChangeEvent<HTMLInputElement>);
                      }}
                      disabled={!isEditing}
                      className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100"
                    >
                      Generate New Code
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    This code will be shown to customers for order pickup verification
                  </p>
                </div>
              </div>
            )}
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
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
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
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
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
                disabled={!isEditing}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:bg-gray-100"
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
                      disabled={!isEditing}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:bg-gray-100"
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

        {isEditing && (
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SellerSettings; 