import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { ICountries } from "../types/globalTypes";
import { child, get, ref, set } from "firebase/database";
import { database } from "../firebase/firebase.ts";

export type LoadState = "idle" | "loading" | "succeeded" | "failed";

export interface IStateLoadState {
  state: LoadState;
  error: string | null;
}

export interface IStateCurrentData {
  data: ICountries[];
  page?: string | null;
}

export interface IStateCountries {
  dataLoadState: LoadState;
  dataLoadError: string | null;
  page: string | null;
  data: ICountries[] | null;
  currentData: ICountries[] | null;
  countPages: number;
}

const initialState: IStateCountries = {
  dataLoadState: "idle",
  dataLoadError: null,
  page: null,
  data: null,
  currentData: null,
  countPages: 0,
};

export const fetchCountries = createAsyncThunk<ICountries[]>(
  "countries/fetchCountries",
  async (_, {rejectWithValue}) => {
    const dbRef = ref(database);
    const countries: ICountries[] = [];
    get(child(dbRef, 'countries')).then((snapshot) => {
      if (snapshot.exists()) {
        countries.push(...snapshot.val());
      }
    }).catch((error) => {
      return rejectWithValue(error.message || "Ошибка загрузки данных из Firebase");
    });
    return countries;
  }
);

export const writeUserCountries = createAsyncThunk<
  void,
  { userId: string; countries: string },
  { rejectValue: string } // тип ошибки
>(
  "countries/saveCountry",
  async ({userId, countries}, {rejectWithValue}) => {
    try {
      await set(ref(database, `users/${userId}/countries`), countries);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка сохранения данных в Firebase");
    }
  }
);


//   function writeUserCountries(countries: string | null) {
//     if (userId) {
//       set(ref(database, `users/${userId}/countries`), countries);
//     } else {
//       console.log('No auth !');
//     }
//   }

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    updateLoadState: (state, action: PayloadAction<IStateLoadState>) => {
      state.dataLoadState = action.payload.state;
      state.dataLoadError = action.payload.error;
    },
    updateData: (state, action: PayloadAction<ICountries[]>) => {
      state.data = action.payload;
      // state.countPages = (Array.isArray(action.payload)) ? Math.ceil(action.payload.length / 10) : 0;
      state.countPages = Math.ceil(action.payload.length / 10);
    },
    updateCurrentData: (state, action: PayloadAction<IStateCurrentData>) => {
      if (action.payload.page === 'all') {
        state.currentData = action.payload.data;
      } else {
        if (action.payload.page !== 'visited') {
          const numberPage: number = Number(action.payload.page);
          state.currentData = action.payload.data.slice((numberPage - 1) * 10, numberPage * 10);
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.dataLoadState = "loading";
        state.dataLoadError = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.dataLoadState = "succeeded";
        state.data = action.payload;
        state.countPages = Math.ceil(action.payload.length / 10);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.dataLoadState = "failed";
        state.dataLoadError =
          (action.payload as string) || action.error.message || "Не удалось загрузить данные";
      });
  },
});

export const {
  updateLoadState,
  updateData,
  updateCurrentData
} = countriesSlice.actions;

export default countriesSlice.reducer;
