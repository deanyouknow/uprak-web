import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCountries } from '../hooks/useCountries';
import { usePagination } from '../hooks/usePagination';
import Layout from '../components/common/Layout';
import SearchBar from '../components/common/SearchBar';
import CountryGrid from '../components/country/CountryGrid';
import Pagination from '../components/ui/Pagination';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/ui/Button';

const AllCountries = () => {
  const { 
    countries, 
    loading, 
    error, 
    searchQuery, 
    handleSearch,
  } = useCountries();
  
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    hasNextPage,
    hasPrevPage
  } = usePagination(countries, 12);

  if (loading) return <Layout><Loading /></Layout>;
  if (error) return <Layout><ErrorMessage message={error} /></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                ← Kembali ke Beranda
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Jelajahi Semua Negara
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan informasi tentang negara-negara di seluruh dunia. Gunakan fitur pencarian untuk menemukan negara tertentu atau jelajahi daftar lengkap negara yang tersedia.
          </p>
        </motion.div>

        {/* Search */}
        <SearchBar 
          searchQuery={searchQuery}
          onSearch={handleSearch}
          placeholder="Search for countries..."
        />

        {/* Results Info */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Menampikan {paginatedData.length} dari {countries.length} negara</span>
          {searchQuery && (
            <span className="text-blue-600">
              Hasil Pencarian dari "{searchQuery}"
            </span>
          )}
        </div>

        {/* Countries Grid */}
        <CountryGrid countries={paginatedData} />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}

        {/* No Results */}
        {countries.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 text-lg">
              Tidak ada negara yang ditemukan untuk "{searchQuery}"
            </div>
            <button
              onClick={() => handleSearch('')}
              className="text-blue-600 hover:text-blue-700 mt-2"
            >
              Bersihkan Pencarian
            </button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default AllCountries;
