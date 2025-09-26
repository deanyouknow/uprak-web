import RandomCountryCard from './RandomCountryCard';

const RandomCountryGrid = ({ countries }) => {
  return (
    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
      {countries.map((country, index) => (
        <RandomCountryCard 
          key={country.cca3} 
          country={country} 
          index={index}
        />
      ))}
    </div>
  );
};

export default RandomCountryGrid;
