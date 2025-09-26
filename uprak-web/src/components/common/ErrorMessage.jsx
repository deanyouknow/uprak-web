  import { motion } from 'framer-motion';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
          Maaf! Terjadi kesalahan.
        </div>
        <p className="text-red-500 dark:text-red-300 text-sm mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
          >
            Coba Lagi
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;

