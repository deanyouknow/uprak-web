import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-64">
      <div className="w-64 h-2 bg-black dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white dark:bg-gray-300"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

export default Loading;
