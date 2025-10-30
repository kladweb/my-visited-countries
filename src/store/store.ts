import { type TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
// import countriesReducer from './countriesSlice';
// import favCountReducer from './favCountriesSlice';
// import currUserReducer from './loginUsersSlice';
// import isOpenInfoBarReducer from './isOpenInfoBarSlice';
// import allUsersCountriesReducer from './allUsersCountriesSlice';

export const store = configureStore({
  reducer: {
    // countries: countriesReducer,
    // favCountries: favCountReducer,
    // currUser: currUserReducer,
    // openInfoBar: isOpenInfoBarReducer,
    // allUsersCountries: allUsersCountriesReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
