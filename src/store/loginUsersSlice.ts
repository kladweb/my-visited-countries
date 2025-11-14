import { createSlice } from '@reduxjs/toolkit';
import { type ICurrUser } from "../types/globalTypes";

interface IStateLoginUsers {
  currUser: ICurrUser | null;
  userName: string;
  userPhoto: string | null;
  idCurrUser: string | null;
  isAllowShowVisited: boolean | null;
  userUID: string | null;
}

const initialState: IStateLoginUsers = {
  currUser: null,
  userName: "",
  userPhoto: null,
  idCurrUser: null,
  isAllowShowVisited: null,
  userUID: null
}

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
