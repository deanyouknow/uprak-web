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
  if (!country) return <Layout><div>Negara tidak ditemukan</div></Layout>;

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
              ← Kembali ke Beranda
            </Button>
          </Link>
        </div>

        {/* Country Header */}
        <div className="bg-gradient-to-r from-gray-300/90 to-white/90 dark:from-gray-800/90 dark:to-gray-600/90 backdrop-blur-sm  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={country.flags?.svg || country.flags?.png}
                alt={`${country.name?.common} flag`}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {country.name?.common}
              </h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {country.name?.official}
              </h2>
              
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Ibu Kota:</span>
                  <span className="dark:text-white">{country.capital?.[0] || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Populasi:</span>
                  <span className="dark:text-white">{country.population?.toLocaleString()}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Wilayah:</span>
                  <span className="dark:text-white">{country.region}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-32">SubWilayah:</span>
                  <span className="dark:text-white">{country.subregion || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Dasar</h3>
             <div className="space-y-2 text-sm">
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Area:</span>
                 <span className="dark:text-white">{country.area?.toLocaleString()} km²</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Bahasa:</span>
                 <span className="dark:text-white">{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Mata Uang:</span>
                 <span className="dark:text-white">{country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Zona Waktu:</span>
                 <span className="dark:text-white">{country.timezones?.[0] || 'N/A'}</span>
               </div>
             </div>
           </div>

           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Geografis</h3>
             <div className="space-y-2 text-sm">
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Benua:</span>
                 <span className="dark:text-white">{country.continents?.[0] || 'N/A'}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Perbatasan:</span>
                 <span className="dark:text-white">{country.borders?.length || 0} Negara</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Terkurung Oleh Daratan:</span>
                 <span className="dark:text-white">{country.landlocked ? 'Ya' : 'Tidak'}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600 dark:text-gray-400">Member UN:</span>
                 <span className="dark:text-white">{country.unMember ? 'Ya' : 'Tidak'}</span>
               </div>
             </div>
           </div>
         </div>
      </motion.div>
    </Layout>
  );
};

export default CountryDetails;
 
