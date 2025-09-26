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
      className="bg-gradient-to-r from-gray-300/90 to-white/900 dark:from-gray-800/90 dark:to-gray-600/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-400/30 dark:border-gray-500/30 overflow-hidden text-gray-900 dark:text-white mb-12"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-500 dark:text-blue-100">Lokasi Anda</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Selamat Datang Di {country.name?.common}!
            </h2>
            
            <div className="space-y-3 dark:text-blue-100 text-gray-500">
              <div className="flex items-center">
                <span className="font-medium mr-3 min-w-[80px]">Ibu Kota:</span>
                <span>{country.capital?.[0] || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-3 min-w-[80px]">Populasi:</span>
                <span>{country.population?.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-3 min-w-[80px]">Benua:</span>
                <span>{country.region}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-3 min-w-[80px]">Mata Uang:</span>
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
              className="mt-6 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-medium
                         hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
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
