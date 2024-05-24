// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers'; // Import your user reducer
import cartReducer from './reducers/cartReducer'; // Import your cart reducer
import { saveCartStateToLocalStorage, loadCartStateFromLocalStorage } from './Config/localStorage';
import redirectReducer from './reducers/redirectSlice';
const preloadedState = {
    cart: loadCartStateFromLocalStorage()
};

// Combine all reducers
const rootReducer = {
    user: userReducer,
    cart: cartReducer,
    redirect: redirectReducer,
    // Add other reducers here if you have more
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState // Pass the preloaded state here
});

// Subscribe to store changes to save cart state to local storage
store.subscribe(() => {
    saveCartStateToLocalStorage(store.getState().cart);
});

export default store;
