import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const userSlice = createSlice({
    name: 'user',
    initialState: initialState.user,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            sessionStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            sessionStorage.removeItem('user');
        },
        fetchUserFromStorage: (state) => {
            const userFromStorage = sessionStorage.getItem('user');
            if (userFromStorage) {
                state.user = JSON.parse(userFromStorage);
            }
        }
    }
});

export const { setUser, logout, fetchUserFromStorage } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
