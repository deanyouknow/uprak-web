const API_BASE_URL = 'https://restcountries.com/v3.1';

export const countryAPI = {
  // Fetch all countries
  getAllCountries: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/all?fields=name,flags,capital,population,region,cca3,currencies,languages`);
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

  // Get user location via IP
  getUserLocation: async () => {
    try {
      // Try multiple IP geolocation services as fallback
      const services = [
        'https://ipapi.co/json/',
        'https://ip-api.com/json/',
        'https://ipinfo.io/json'
      ];

      for (let service of services) {
        try {
          const response = await fetch(service);
          if (response.ok) {
            const data = await response.json();
            return data;
          }
        } catch (err) {
          continue; // Try next service
        }
      }
      
      throw new Error('All geolocation services failed');
    } catch (error) {
      throw new Error(`Location Error: ${error.message}`);
    }
  }
};
