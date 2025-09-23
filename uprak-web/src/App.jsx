import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllCountries from './pages/AllCountries';
import CountryDetails from './pages/CountryDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<AllCountries />} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
