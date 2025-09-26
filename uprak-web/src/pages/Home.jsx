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
import Navbar from '../components/common/Navbar';

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
    <>
    <Navbar>
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Jelajahi Negara Negara
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Temukan informasi menarik tentang berbagai negara di seluruh dunia.
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
                Jelajahi Semua Negara →
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Additional Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 md:p-8"
        >
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Fakta Menarik Tentang Negara Negara di Dunia
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Dunia ini terdiri dari berbagai negara dengan keunikan budaya, bahasa, dan sejarah masing-masing. Berikut adalah beberapa fakta menarik:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
               <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                 <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">195</div>
                 <div className="text-sm text-gray-600 dark:text-gray-400">Negara</div>
               </div>
               <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                 <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">7</div>
                 <div className="text-sm text-gray-600 dark:text-gray-400">Benua</div>
               </div>
               <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                 <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">180+</div>
                 <div className="text-sm text-gray-600 dark:text-gray-400">Mata Uang</div>
               </div>
               <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                 <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">6500+</div>
                 <div className="text-sm text-gray-600 dark:text-gray-400">Bahasa</div>
               </div>
             </div>
          </div>
        </motion.section>
      </div>
    </Navbar>
    </>
  );
};

export default Home;
