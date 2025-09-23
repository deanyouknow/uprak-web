  import CountryCard from './CountryCard';

const CountryGrid = ({ countries }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    gap-6 md:gap-8">
      {countries.map((country, index) => (
        <CountryCard 
          key={country.cca3} 
          country={country} 
          index={index}
        />
      ))}
    </div>
  );
};

export default CountryGrid;

