import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedCountriesState {
  selected: Record<string, boolean>;
}

const initialState: SelectedCountriesState = {
  selected: {},
};

const selectedCountriesSlice = createSlice({
  name: 'selectedCountries',
  initialState,
  reducers: {
    toggleCountrySelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.selected[id] = !state.selected[id];
    },
    toggleSelectAll: (state, action: PayloadAction<string[]>) => {
      const allSelected = Object.values(state.selected).every(Boolean);
      action.payload.forEach((id) => {
        state.selected[id] = !allSelected;
      });
    },
    clearSelections: (state) => {
      state.selected = {};
    },
  },
});

export const { toggleCountrySelection, toggleSelectAll, clearSelections } =
  selectedCountriesSlice.actions;
export default selectedCountriesSlice.reducer;
