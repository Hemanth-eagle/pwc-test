// utils.test.js
import { Country } from '@/_api/useCountries';
import { filteredAndSortCountries } from './countries';

const mockCountries = [
  { name: { common: 'CountryA' }, region: 'Europe', population: 1000, capital: ['CapitalA'] },
  { name: { common: 'CountryB' }, region: 'Asia', population: 2000, capital: ['CapitalB'] },
  { name: { common: 'CountryC' }, region: 'Europe', population: 500, capital: ['CapitalC'] },
];

describe('filteredAndSortCountries', () => {
  it('should filter by region', () => {
    const result = filteredAndSortCountries(mockCountries as Country[], 'Europe', '', '');
    expect(result).toHaveLength(2);
    expect(result[0].name.common).toBe('CountryA');
    expect(result[1].name.common).toBe('CountryC');
  });

  it('should filter by search term in name', () => {
    const result = filteredAndSortCountries(mockCountries as Country[], '', 'CountryA', '');
    expect(result).toHaveLength(1);
    expect(result[0].name.common).toBe('CountryA');
  });

  it('should filter by search term in capital', () => {
    const result = filteredAndSortCountries(mockCountries as Country[], '', 'CapitalC', '');
    expect(result).toHaveLength(1);
    expect(result[0].name.common).toBe('CountryC');
  });

  it('should sort by population in ascending order', () => {
    const result = filteredAndSortCountries(mockCountries as Country[], '', '', 'asc');
    expect(result[0].name.common).toBe('CountryC');
    expect(result[1].name.common).toBe('CountryA');
    expect(result[2].name.common).toBe('CountryB');
  });

  it('should sort by population in descending order', () => {
    const result = filteredAndSortCountries(mockCountries as Country[], '', '', 'desc');
    expect(result[0].name.common).toBe('CountryB');
    expect(result[1].name.common).toBe('CountryA');
    expect(result[2].name.common).toBe('CountryC');
  });

  it('should handle empty data', () => {
    const result = filteredAndSortCountries([], '', '', '');
    expect(result).toHaveLength(0);
  });

  it('should handle no filtering or sorting', () => {
    const result = filteredAndSortCountries(mockCountries as Country[], '', '', '');
    expect(result).toHaveLength(3);
    expect(result[0].name.common).toBe('CountryA');
    expect(result[1].name.common).toBe('CountryB');
    expect(result[2].name.common).toBe('CountryC');
  });
});
