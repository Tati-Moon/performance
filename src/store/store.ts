import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedCountriesReducer from './reducers/SelectedCountriesSlice';
import { countriesAPI } from '../services/countriesAPI';

const rootReducer = combineReducers({
  selectedCountries: selectedCountriesReducer,
  [countriesAPI.reducerPath]: countriesAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(countriesAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
