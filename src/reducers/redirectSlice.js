// src/features/redirect/redirectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  targetPath: null,
};

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirectPath: (state, action) => {
      state.targetPath = action.payload;
    },
    clearRedirectPath: (state) => {
      state.targetPath = null;
    },
  },
});

export const {
  setRedirectPath,
  clearRedirectPath,
} = redirectSlice.actions;

export const selectRedirectPath = (state) =>
  state.redirect.targetPath;

export default redirectSlice.reducer;
