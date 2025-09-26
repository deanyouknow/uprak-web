  import { useState, useEffect } from 'react';
import { countryAPI } from '../services/api';

export const useCountryDetail = (countryCode) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (countryCode) {
      fetchCountryDetail();
    }
  }, [countryCode]);

  const fetchCountryDetail = async () => {
    try {
      setLoading(true);
      const data = await countryAPI.getCountryByCode(countryCode);
      setCountry(data[0]); // API returns array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    country,
    loading,
    error,
    refetch: fetchCountryDetail
  };
};

