import { useState, useEffect } from 'react';

export const useUserLocation = () => {
  const [userCountry, setUserCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    detectUserLocation();
  }, []);

  const detectUserLocation = async () => {
    try {
      setLoading(true);
      
      // Method 1: Try IP Geolocation (most reliable)
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        
        // Get detailed country info from REST Countries API
        const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${data.country_code}`);
        if (countryResponse.ok) {
          const countryData = await countryResponse.json();
          setUserCountry(countryData[0]);
        } else {
          throw new Error('Country not found');
        }
      } else {
        throw new Error('Unable to detect location');
      }
    } catch (err) {
      // Fallback: Try browser geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Use reverse geocoding (you might need a different service for this)
              // For now, we'll set a default country (Indonesia)
              const fallbackResponse = await fetch('https://restcountries.com/v3.1/alpha/ID');
              if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json();
                setUserCountry(fallbackData[0]);
              }
            } catch (fallbackErr) {
              setError('Unable to detect your location');
            } finally {
              setLoading(false);
            }
          },
          () => {
            setError('Location access denied');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation not supported');
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    userCountry,
    loading,
    error,
    refetch: detectUserLocation
  };
};
