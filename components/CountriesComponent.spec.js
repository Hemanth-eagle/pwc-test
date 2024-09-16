import { render, screen, waitFor } from '@testing-library/react';
import Countries from './Countries';
import { useCountries } from '../_api/useCountries';

jest.mock('../_api/useCountries', () => ({
  useCountries: jest.fn(),
}));

describe('Countries Page Integration Test', () => {
  beforeEach(() => {
    useCountries.mockReturnValue({
      countries: [
        { name: { common: 'CountryA' }, region: 'Europe', population: 1000, capital: ['CapitalA'], flags: { png: '' } },
        { name: { common: 'CountryB' }, region: 'Asia', population: 2000, capital: ['CapitalB'], flags: { png: '' } },
      ],
      loading: false,
      error: null,
    });
  });

  it('should render the Countries page with country data', async () => {
    render(<Countries />);

    expect(screen.getByText('CountryA')).toBeInTheDocument();
    expect(screen.getByText('CountryB')).toBeInTheDocument();
    
    expect(screen.getByTitle('sort')).toBeInTheDocument();
    expect(screen.getByTitle('filter')).toBeInTheDocument();

    fireEvent.change(screen.getByTitle('sort'), { target: { value: 'asc' } });
    await waitFor(() => {
      expect(screen.getByText('CountryA')).toBeInTheDocument();
    });
  });
});
