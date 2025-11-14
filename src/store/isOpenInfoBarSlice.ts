import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenInfoBar: null,
}

export const isOpenInfoBarSlice = createSlice({
  name: 'openInfoBar',
  initialState,
  reducers: {
    setOpenInfoBar: (state, action) => {
      state.isOpenInfoBar = action.payload;
    }
  }
});

export const {setOpenInfoBar} = isOpenInfoBarSlice.actions;

export default isOpenInfoBarSlice.reducer;