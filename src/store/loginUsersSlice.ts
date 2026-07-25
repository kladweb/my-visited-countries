import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type ICurrUser } from "../types/globalTypes";
import { child, get, ref, set } from "firebase/database";
import { database } from "../firebase/firebase.ts";

interface IStateLoginUsers {
  userNameLoadState: "idle" | "loading" | "succeeded" | "failed";
  currUser: ICurrUser | null;
  userName: string;
  userPhoto: string | null;
  idCurrUser: string | null;
  isAllowShowVisited: boolean | null;
  userUID: string | null;
}

const initialState: IStateLoginUsers = {
  userNameLoadState: "idle",
  currUser: null,
  userName: "",
  userPhoto: null,
  idCurrUser: null,
  isAllowShowVisited: null,
  userUID: null
}

export const readUserName = createAsyncThunk<
  string,
  { userId: string },
  { rejectValue: string }
>(
  "countries/readUserName",
  async ({userId}, {rejectWithValue}) => {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, `users/${userId}/userName`));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка загрузки данных из Firebase");
    }
  }
);

export const writeUserName = createAsyncThunk<
  void,
  { userId: string; userName: string },
  { rejectValue: string }
>(
  "countries/writeUserName",
  async ({userId, userName}, {rejectWithValue}) => {
    try {
      await set(ref(database, `users/${userId}/userName/`), userName);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка сохранения данных в Firebase");
    }
  }
);

export const loginUserSlice = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    setCurrUser: (state, action) => {
      state.currUser = action.payload.currUser;
      if (action.payload.currUser) {
        state.idCurrUser = action.payload.currUser.uid;
      }
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserPhoto: (state, action) => {
      state.userPhoto = action.payload;
    },
    setAllowShowVisited: (state, action) => {
      state.isAllowShowVisited = action.payload;
    },
    setUserUID: (state, action) => {
      state.userUID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readUserName.pending, (state) => {
        state.userNameLoadState = "loading";
      })
      .addCase(readUserName.fulfilled, (state, action) => {
        state.userNameLoadState = "succeeded";
        state.userName = action.payload;
      })
      .addCase(readUserName.rejected, (state, action) => {
        state.userNameLoadState = "failed";
        state.userName = action.payload || "Неизвестная ошибка";
      });
  }
});

export const {
  setCurrUser,
  setUserName,
  setUserPhoto,
  setAllowShowVisited,
  setUserUID
} = loginUserSlice.actions;

export default loginUserSlice.reducer;
