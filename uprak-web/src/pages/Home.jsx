  import { useCountries } from '../hooks/useCountries';
import { usePagination } from '../hooks/usePagination';
import Layout from '../components/common/Layout';
import SearchBar from '../components/common/SearchBar';
import CountryGrid from '../components/country/CountryGrid';
import Pagination from '../components/ui/Pagination';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const Home = () => {
  const { countries, loading, error, searchQuery, handleSearch } = useCountries();
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    hasNextPage,
    hasPrevPage
  } = usePagination(countries, 10);

  if (loading) return <Layout><Loading /></Layout>;
  if (error) return <Layout><ErrorMessage message={error} /></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Countries Around the World
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover detailed information about countries, their capitals, population, and more.
          </p>
        </div>

        <SearchBar 
          searchQuery={searchQuery}
          onSearch={handleSearch}
          placeholder="Search for countries..."
        />

        <div className="text-sm text-gray-600 mb-4">
          Showing {paginatedData.length} of {countries.length} countries
        </div>

        <CountryGrid countries={paginatedData} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
      </div>
    </Layout>
  );
};

export default Home;

