// src/features/redirect/redirectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    path: null,
};

const redirectSlice = createSlice({
    name: 'redirect',
    initialState,
    reducers: {
        setRedirectPath: (state, action) => {
            state.path = action.payload;
        },
    },
});

export const { setRedirectPath } = redirectSlice.actions;

export const selectRedirectPath = (state) => state.redirect.path;

export default redirectSlice.reducer;
