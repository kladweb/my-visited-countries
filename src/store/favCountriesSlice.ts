import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { child, get, ref, set } from "firebase/database";
import { database } from "../firebase/firebase";

interface IStateCountries {
  userCountries: string[];
  favDataLoadState: "idle" | "loading" | "succeeded" | "failed";
  userCountriesError: string | null;
}

const initialState: IStateCountries = {
  favDataLoadState: "idle",
  userCountries: [],
  userCountriesError: null,
}

export const fetchUserCountries = createAsyncThunk<
  string[],
  { userId: string },
  { rejectValue: string }
>(
  "countries/fetchUserCountries",
  async ({userId}, {rejectWithValue}) => {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, `users/${userId}/countries`));
      return snapshot.exists() ? JSON.parse(snapshot.val()) : [];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка загрузки данных из Firebase");
    }
  }
);

export const writeUserCountries = createAsyncThunk<
  void,
  { userId: string; countries: string[] },
  { rejectValue: string }
>(
  "countries/writeUserCountries",
  async ({userId, countries}, {rejectWithValue}) => {
    try {
      await set(ref(database, `users/${userId}/countries`), JSON.stringify(countries));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка сохранения данных в Firebase");
    }
  }
);

export const favCountriesSlice = createSlice({
  name: 'favCountries',
  initialState,
  reducers: {
    updateFavData: (state, action) => {
      state.userCountries = action.payload;
      state.favDataLoadState = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCountries.pending, (state) => {
        state.favDataLoadState = "loading";
        state.userCountriesError = null;
      })
      .addCase(fetchUserCountries.fulfilled, (state, action) => {
        state.favDataLoadState = "succeeded";
        state.userCountries = action.payload;
      })
      .addCase(fetchUserCountries.rejected, (state, action) => {
        state.favDataLoadState = "failed";
        state.userCountriesError = action.payload || "Неизвестная ошибка";
      });
  }
});

export const {updateFavData} = favCountriesSlice.actions;

export default favCountriesSlice.reducer;
