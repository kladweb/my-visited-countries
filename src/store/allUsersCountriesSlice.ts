import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { sortVisitedCountries } from "../utilities/sortingCountries";

export interface IAllUserCountries {
  userName: string;
  countries: string[];
  userPhoto: string;
  userId: string;
}

interface IStateAllUsersCountries {
  allCountriesLoadState: 0 | 1 | 2;
  allCountries: IAllUserCountries[];
}

const initialState: IStateAllUsersCountries = {
  allCountriesLoadState: 0,
  allCountries: [],
}

export const allUsersCountriesSlice = createSlice({
    name: 'allUsersCountries',
    initialState,
    reducers: {
      updateAllUsersCountries: (state, action: PayloadAction<IAllUserCountries[]>) => {
        state.allCountries = sortVisitedCountries(action.payload);
        state.allCountriesLoadState = 2;
      }
    }
  }
)

export const {updateAllUsersCountries} = allUsersCountriesSlice.actions;

export default allUsersCountriesSlice.reducer;
