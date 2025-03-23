import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICountryDetail } from '../models/ICountryDetail';

export const countriesAPI = createApi({
  reducerPath: 'countriesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/all' }),
  tagTypes: ['Countries'],
  endpoints: (build) => ({
    fetchAllCountries: build.query<ICountryDetail[], void>({
      query: () => '',
    }),
  }),
});

export const { useFetchAllCountriesQuery } = countriesAPI;
