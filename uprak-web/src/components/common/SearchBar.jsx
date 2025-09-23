 import { motion } from 'framer-motion';

const SearchBar = ({ searchQuery, onSearch, placeholder = "Search countries..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   transition duration-200 shadow-sm"
      />
    </motion.div>
  );
};

export default SearchBar;

