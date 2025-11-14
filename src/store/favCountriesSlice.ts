import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favDataLoadState: 0,
  data: [],
}

export const favCountriesSlice = createSlice({
  name: 'favCountries',
  initialState,
  reducers: {
    updateFavData: (state, action) => {
      state.data = action.payload;
      state.favDataLoadState = 2;
    },
  }
});

export const {updateFavData} = favCountriesSlice.actions;

export default favCountriesSlice.reducer;
