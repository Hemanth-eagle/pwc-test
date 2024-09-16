"use client";

import React, { useState, useMemo } from "react";
import { useCountries } from "../_api/useCountries";
import Image from "next/image";

// SortControl Component
const Sort = ({ onSort }: { onSort: (val: string) => void }) => (
  <select
    title="sort"
    onChange={(e) => onSort(e.target.value)}
    className="p-2 border rounded"
  >
    <option value="">Sort by Population</option>
    <option value="asc">Population (Asc)</option>
    <option value="desc">Population (Desc)</option>
  </select>
);

// FilterControl Component
const Filter = ({
  regions,
  onFilter,
}: {
  regions: string[];
  onFilter: (val: string) => void;
}) => (
  <select
    title="filter"
    onChange={(e) => onFilter(e.target.value)}
    className="p-2 border rounded"
  >
    <option value="">Filter by Region</option>
    {regions.map((region) => (
      <option key={region} value={region}>
        {region}
      </option>
    ))}
  </select>
);

// SearchControl Component
const Search = ({ onSearch }: { onSearch: (val: string) => void }) => (
  <input
    type="text"
    placeholder="Search by name or capital"
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border rounded w-full"
  />
);

const Countries = () => {
  const { countries, loading, error } = useCountries();
  const [sortOrder, setSortOrder] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const regionsDuplicates = countries.map((country) => country.region);
  const regions: string[] = useMemo(
    () => [
      ...regionsDuplicates.filter(
        (val, idx) => regionsDuplicates.indexOf(val) === idx
      ),
    ],
    [regionsDuplicates]
  );

  const filteredAndSortedCountries = useMemo(() => {
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
  }, [countries, sortOrder, filterRegion, searchTerm]);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed mb-4 flex flex-col sm:flex-row gap-4">
        <Sort onSort={setSortOrder} />
        <Filter regions={regions} onFilter={setFilterRegion} />
        <Search onSearch={setSearchTerm} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredAndSortedCountries.map((country, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              src={country.flags.png}
              alt={country.name.common}
              className="w-100 h-90 object-cover"
              width={100}
              height={90}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {country.name.common}
              </h2>
              <p className="text-gray-600 mb-2">
                Official: {country.name.official}
              </p>
              <p className="text-gray-600 mb-2">
                Capital: {country.capital?.join(", ")}
              </p>
              <p className="text-gray-600 mb-2">Region: {country.region}</p>
              <p className="text-gray-600">
                Population: {country.population.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
