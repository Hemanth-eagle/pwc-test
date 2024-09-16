import { Country } from "@/_api/useCountries";

export const filteredAndSortCountries = (
  countries: Country[],
  filterRegion: string,
  searchTerm: string,
  sortOrder: string
) => {
  return countries
    .filter(
      (country) =>
        (filterRegion === "" || country.region === filterRegion) &&
        (searchTerm === "" ||
          country.name.common
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          country.capital?.some((cap) =>
            cap.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.population - b.population;
      if (sortOrder === "desc") return b.population - a.population;
      return 0;
    });
};
