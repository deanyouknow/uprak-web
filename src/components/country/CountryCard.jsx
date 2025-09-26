import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CountryCard = ({ country, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/country/${country.cca3}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)" 
      }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden cursor-pointer
                 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
      onClick={handleClick}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`${country.name?.common} flag`}
          className="w-full h-full object-cover transition-transform duration-500 
                     group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {country.name?.common}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span className="font-medium">Populasi:</span>
            <span className="text-right">{country.population?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Benua:</span>
            <span className="text-right">{country.region}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Ibu Kota:</span>
            <span className="text-right">{country.capital?.[0] || 'N/A'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryCard;
