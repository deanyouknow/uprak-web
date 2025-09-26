import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RandomCountryCard = ({ country, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/country/${country.cca3}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15)" 
      }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer
                 hover:shadow-lg transition-all duration-300 group min-w-0 flex-1"
      onClick={handleClick}
    >
      <div className="relative h-24 sm:h-28 overflow-hidden">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`${country.name?.common} flag`}
          className="w-full h-full object-cover transition-transform duration-500 
                     group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {country.name?.common}
        </h3>

        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span className="font-medium">Populasi:</span>
            <span className="text-right text-xs">
              {country.population > 1000000 
                ? `${(country.population / 1000000).toFixed(1)}M` 
                : country.population?.toLocaleString()
              }
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Wilayah:</span>
            <span className="text-right">{country.region}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Ibu Kota:</span>
            <span className="text-right truncate max-w-[80px]">
              {country.capital?.[0] || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RandomCountryCard;
