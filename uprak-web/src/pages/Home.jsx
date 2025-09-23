import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCountries } from '../hooks/useCountries';
import { useUserLocation } from '../hooks/useUserLocation';
import Layout from '../components/common/Layout';
import UserCountryCard from '../components/country/UserCountryCard';
import RandomCountryGrid from '../components/country/RandomCountryGrid';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/ui/Button';

const Home = () => {
  const { userCountry, loading: locationLoading } = useUserLocation();
  const { 
    randomCountries, 
    loading: countriesLoading, 
    error, 
    refreshRandomCountries 
  } = useCountries();

  const loading = locationLoading || countriesLoading;

  if (loading) return <Layout><Loading /></Layout>;
  if (error) return <Layout><ErrorMessage message={error} /></Layout>;

  return (
    <Layout>
      <div className="space-y-12">
        {/* User Country Section */}
        <UserCountryCard country={userCountry} />

        {/* Random Countries Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Discover Countries
              </h2>
              <p className="text-gray-600">
                Explore random countries from around the world
              </p>
            </div>
            <Button 
              onClick={refreshRandomCountries}
              variant="outline"
              className="hidden sm:flex items-center gap-2"
            >
              🎲 Shuffle
            </Button>
          </div>
          
          {/* Mobile shuffle button */}
          <div className="sm:hidden mb-4">
            <Button 
              onClick={refreshRandomCountries}
              variant="outline"
              size="sm"
              className="w-full"
            >
              🎲 Shuffle Countries
            </Button>
          </div>
          
          <RandomCountryGrid countries={randomCountries} />
          
          <div className="text-center mt-8">
            <Link to="/countries">
              <Button 
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore All Countries →
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Additional Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 md:p-8"
        >
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Explore the World
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Discover detailed information about every country in the world. 
              Learn about their cultures, economies, geography, and much more.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">195</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">7</div>
                <div className="text-sm text-gray-600">Continents</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-1">180+</div>
                <div className="text-sm text-gray-600">Currencies</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">6500+</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default Home;
