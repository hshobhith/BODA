import React, { createContext, useContext, useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  city: string;
  isDetected: boolean;
}

interface LocationContextType {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  detectLocation: () => Promise<void>;
  setManualLocation: (city: string) => void;
}

const defaultLocation: Location = {
  latitude: 40.7128,
  longitude: -74.0060,
  city: 'New York',
  isDetected: false
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with stored location or fetch on mount
  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    
    if (storedLocation) {
      try {
        setLocation(JSON.parse(storedLocation));
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to parse stored location', err);
        setLocation(defaultLocation);
        setIsLoading(false);
      }
    } else {
      // Auto-detect location on first visit
      detectLocation().catch(() => {
        // Fall back to default if detection fails
        setLocation(defaultLocation);
        setIsLoading(false);
      });
    }
  }, []);

  // Save location to localStorage when it changes
  useEffect(() => {
    if (location) {
      localStorage.setItem('userLocation', JSON.stringify(location));
    }
  }, [location]);

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }
      
      // Get coordinates
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      // In a real app, we would use a reverse geocoding service to get the city name
      // For this demo, we'll simulate it with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulated city name based on coordinates - in a real app this would come from an API
      const city = 'New York'; // Placeholder
      
      const newLocation: Location = {
        latitude,
        longitude,
        city,
        isDetected: true
      };
      
      setLocation(newLocation);
      setIsLoading(false);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to detect location';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const setManualLocation = (city: string) => {
    // In a real app, we would geocode the city to get coordinates
    // For this demo, we'll use default coordinates
    setLocation({
      ...defaultLocation,
      city,
      isDetected: false
    });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        detectLocation,
        setManualLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the location context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};