import { Country } from "@/_api/useCountries";
import Image from "next/image";
import Link from "next/link";

export function CountryCard({
  country,
  index,
}: {
  country: Country;
  index: number;
}) {
  return (
    <Link href={`/countries/${country.cca3}`}>
    <div
      key={index}
      className="bg-white dark:bg-gray-600 shadow-md rounded-lg overflow-hidden"
      style={{ height: 300 }}
    >
      <Image
        src={country.flags.png}
        alt={country.name.common}
        className="object-cover"
        width={100}
        height={90}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Official: {country.name.official}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Capital: {country.capital?.join(", ")}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Region: {country.region}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Population: {country.population.toLocaleString()}
        </p>
      </div>
    </div>
    </Link>
  );
}
