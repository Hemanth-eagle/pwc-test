"use client";

import React, { useState, useMemo } from "react";
import { useCountries } from "../_api/useCountries";
import LazyLoading from "./LazyLoading";
import { DarkModeToggle } from "./DarkModeToggle";
import { CountryCard } from "./CountryCard";
import { filteredAndSortCountries } from "@/utils/countries";

// SortControl Component
const Sort = ({ onSort }: { onSort: (val: string) => void }) => (
  <select
    title="sort"
    onChange={(e) => onSort(e.target.value)}
    className="p-2 border dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded"
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
    className="p-2 border dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded"
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
    className="p-2 border dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded w-full"
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
    return filteredAndSortCountries(
      countries,
      filterRegion,
      searchTerm,
      sortOrder
    );
  }, [countries, sortOrder, filterRegion, searchTerm]);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="sticky top-0 mb-4 flex flex-col sm:flex-row gap-4">
        <Sort onSort={setSortOrder} />
        <Filter regions={regions} onFilter={setFilterRegion} />
        <Search onSearch={setSearchTerm} />
      </div>
      <div className="mb-4">
        <DarkModeToggle />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredAndSortedCountries.map((country, index) => (
          <LazyLoading key={index}>
            <CountryCard country={country} index={index} />
          </LazyLoading>
        ))}
      </div>
    </div>
  );
};

export default Countries;
