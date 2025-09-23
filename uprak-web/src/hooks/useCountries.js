  import { useState, useEffect } from 'react';
import { countryAPI } from '../services/api';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchQuery, countries]);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const data = await countryAPI.getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return {
    countries: filteredCountries,
    loading,
    error,
    searchQuery,
    handleSearch,
    refetch: fetchCountries
  };
};

