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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
                 hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`${country.name?.common} flag`}
          className="w-full h-full object-cover transition-transform duration-300 
                     hover:scale-110"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
          {country.name?.common}
        </h3>
        
        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-medium">Population:</span> {country.population?.toLocaleString()}</p>
          <p><span className="font-medium">Region:</span> {country.region}</p>
          <p><span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryCard;
 
