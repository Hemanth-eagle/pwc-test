// pages/countries/[countryCode].js

import { useRouter } from 'next/router';
import { useCountries } from '../../_api/useCountries';
import Image from 'next/image';

const CountryDetail = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const { countries, loading, error } = useCountries();

  if (loading) return <p className="text-center text-gray-600">Loading country details...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  const country = countries.find(c => c.cca3 === countryCode);

  if (!country) return <p className="text-center text-gray-600">Country not found</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <Image
            src={country.flags.png}
            alt={country.name.common}
            className="w-full h-48 object-cover"
            width={300}
            height={200}
          />
          <div className="absolute top-0 left-0 bg-black bg-opacity-40 text-white p-4">
            <h1 className="text-4xl font-bold">{country.name.common}</h1>
          </div>
        </div>
        <div className="p-6">
          <p className="text-lg font-semibold mb-2">
            <span className="font-bold">Official Name:</span> {country.name.official}
          </p>
          <p className="text-lg font-semibold mb-2">
            <span className="font-bold">Capital:</span> {country.capital?.join(', ')}
          </p>
          <p className="text-lg font-semibold mb-2">
            <span className="font-bold">Region:</span> {country.region}
          </p>
          <p className="text-lg font-semibold mb-2">
            <span className="font-bold">Population:</span> {country.population.toLocaleString()}
          </p>
          <p className="text-lg font-semibold mb-2">
            <span className="font-bold">Languages:</span> {Object.values(country.languages).join(', ')}
          </p>
          <p className="text-lg font-semibold mb-2">
            <span className="font-bold">Currencies:</span> {Object.values(country.currencies).map(c => c.name).join(', ')}
          </p>
          <p className="text-lg font-semibold mb-2">
            <span className="font-bold">Time Zones:</span> {country.timezones.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
