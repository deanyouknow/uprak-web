 const API_BASE_URL = 'https://restcountries.com/v3.1';

export const countryAPI = {
  // Fetch all countries
  getAllCountries: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/all?fields=name,flags,capital,population,region,cca3`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      return await response.json();
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  },

  // Fetch country by code
  getCountryByCode: async (code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alpha/${code}`);
      if (!response.ok) throw new Error('Country not found');
      return await response.json();
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  },

  // Search countries by name
  searchCountries: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/name/${query}?fields=name,flags,capital,population,region,cca3`);
      if (!response.ok) throw new Error('No countries found');
      return await response.json();
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  }
};

