import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../consts/urls';
import { ICountryDetail } from '../models/ICountryDetail';

export const countriesAPI = createApi({
  reducerPath: 'countriesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Countries'],
  endpoints: (build) => ({
    fetchAllCountries: build.query<ICountryDetail[], void>({
      query: () => '/v3.1/all',
    }),
  }),
});

export const { useFetchAllCountriesQuery } = countriesAPI;
