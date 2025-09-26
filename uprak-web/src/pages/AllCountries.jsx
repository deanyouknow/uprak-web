import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
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

  const [sortBy, setSortBy] = useState('alphabet');

  const sortedCountries = useMemo(() => {
    let sorted = [...countries];
    switch (sortBy) {
      case 'alphabet':
        sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
        break;
      case 'random':
        sorted = sorted.sort(() => Math.random() - 0.5);
        break;
      case 'population':
        sorted.sort((a, b) => b.population - a.population);
        break;
      case 'region':
        sorted.sort((a, b) => a.region.localeCompare(b.region));
        break;
      default:
        break;
    }
    return sorted;
  }, [countries, sortBy]);

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    hasNextPage,
    hasPrevPage
  } = usePagination(sortedCountries, 12);

  if (loading) return <Layout><Loading /></Layout>;
  if (error) return <Layout><ErrorMessage message={error} /></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline">
                ← Kembali ke Beranda
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Jelajahi Semua Negara
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center">
            Temukan informasi tentang negara-negara di seluruh dunia. Gunakan fitur pencarian untuk menemukan negara tertentu atau jelajahi daftar lengkap negara yang tersedia.
          </p>
        </motion.div>

        {/* Search */}
        <SearchBar
          searchQuery={searchQuery}
          onSearch={handleSearch}
          placeholder="Search for countries..."
        />

        {/* Sort */}
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="alphabet">Alphabet</option>
            <option value="random">Random</option>
            <option value="population">Populasi</option>
            <option value="region">Benua</option>
          </select>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>Menampikan {paginatedData.length} dari {sortedCountries.length} negara</span>
          {searchQuery && (
            <span className="text-blue-600 dark:text-blue-400">
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
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              Tidak ada negara yang ditemukan untuk "{searchQuery}"
            </div>
            <button
              onClick={() => handleSearch('')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2"
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
