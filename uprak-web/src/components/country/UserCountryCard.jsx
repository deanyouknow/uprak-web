import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UserCountryCard = ({ country }) => {
  const navigate = useNavigate();

  if (!country) return null;

  const handleViewDetails = () => {
    navigate(`/country/${country.cca3}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden text-white mb-12"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-sm font-medium text-blue-100">Your Location</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to {country.name?.common}!
            </h2>
            
            <div className="space-y-3 text-blue-100">
              <div className="flex items-center">
                <span className="font-medium mr-3 min-w-[80px]">Capital:</span>
                <span>{country.capital?.[0] || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-3 min-w-[80px]">Population:</span>
                <span>{country.population?.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-3 min-w-[80px]">Region:</span>
                <span>{country.region}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-3 min-w-[80px]">Currency:</span>
                <span>
                  {country.currencies 
                    ? Object.values(country.currencies).map(c => c.name).join(', ')
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
            
            <button
              onClick={handleViewDetails}
              className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium 
                         hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
            >
              View Details
            </button>
          </div>
          
          <div className="flex justify-center">
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={country.flags?.svg || country.flags?.png}
              alt={`${country.name?.common} flag`}
              className="w-48 h-32 object-cover rounded-lg shadow-lg border-4 border-white/20"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCountryCard;
