// src/store.js
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userReducers';
import cartReducer from './reducers/cartReducer';
import redirectReducer from './reducers/redirectSlice';

import {
  saveCartStateToLocalStorage,
  loadCartStateFromLocalStorage,
} from './utils/localStorageUtils';

const preloadedState = {
  cart: loadCartStateFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    redirect: redirectReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartStateToLocalStorage(store.getState().cart);
});

export default store;
