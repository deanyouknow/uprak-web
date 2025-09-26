import { useState, useEffect } from 'react';
import { countryAPI } from '../services/api';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [randomCountries, setRandomCountries] = useState([]);
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

  const getRandomCountries = (allCountries, count = 5) => {
    const shuffled = [...allCountries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const data = await countryAPI.getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
      
      // Set 5 random countries
      const random = getRandomCountries(data, 5);
      setRandomCountries(random);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const refreshRandomCountries = () => {
    const random = getRandomCountries(countries, 5);
    setRandomCountries(random);
  };

  return {
    countries: filteredCountries,
    randomCountries,
    loading,
    error,
    searchQuery,
    handleSearch,
    refreshRandomCountries,
    refetch: fetchCountries
  };
};
