 import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCountryDetail } from '../hooks/useCountryDetail';
import Layout from '../components/common/Layout';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/ui/Button';

const CountryDetails = () => {
  const { code } = useParams();
  const { country, loading, error, refetch } = useCountryDetail(code);

  if (loading) return <Layout><Loading /></Layout>;
  if (error) return <Layout><ErrorMessage message={error} onRetry={refetch} /></Layout>;
  if (!country) return <Layout><div>Country not found</div></Layout>;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline">
              ← Back to Countries
            </Button>
          </Link>
        </div>

        {/* Country Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={country.flags?.svg || country.flags?.png}
                alt={`${country.name?.common} flag`}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {country.name?.common}
              </h1>
              <h2 className="text-xl text-gray-600 mb-6">
                {country.name?.official}
              </h2>
              
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Capital:</span>
                  <span>{country.capital?.[0] || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Population:</span>
                  <span>{country.population?.toLocaleString()}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Region:</span>
                  <span>{country.region}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Sub Region:</span>
                  <span>{country.subregion || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Area:</span>
                <span>{country.area?.toLocaleString()} km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Languages:</span>
                <span>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Currencies:</span>
                <span>{country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Timezones:</span>
                <span>{country.timezones?.[0] || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Geography</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Continent:</span>
                <span>{country.continents?.[0] || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Borders:</span>
                <span>{country.borders?.length || 0} countries</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Landlocked:</span>
                <span>{country.landlocked ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">UN Member:</span>
                <span>{country.unMember ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default CountryDetails;
 
