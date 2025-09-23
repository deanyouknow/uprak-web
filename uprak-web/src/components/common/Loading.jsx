  
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-64">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-blue-500 rounded-full"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;
