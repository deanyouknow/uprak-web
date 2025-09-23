  import { motion } from 'framer-motion';
import Button from './Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  hasNextPage, 
  hasPrevPage 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center space-x-4 mt-12"
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        variant="outline"
      >
        Previous
      </Button>
      
      <div className="flex items-center space-x-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              variant={pageNum === currentPage ? 'primary' : 'outline'}
              size="sm"
            >
              {pageNum}
            </Button>
          );
        })}
      </div>
      
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        variant="outline"
      >
        Next
      </Button>
    </motion.div>
  );
};

export default Pagination;

