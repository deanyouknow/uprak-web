  import { motion } from 'framer-motion';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-red-600 text-lg font-medium mb-2">
          Oops! Something went wrong
        </div>
        <p className="text-red-500 text-sm mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;

