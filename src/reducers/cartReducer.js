import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const cartSlice = createSlice({
    name: 'cart',
    initialState:initialState.cart,
    reducers: {
        add: (state, action) => {
            const newItem = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);

            if (existingItemIndex !== -1) {
                // If the item already exists in the cart, increment its quantity
                state.cartItems[existingItemIndex].quantity += 1;
            } else {
                // If the item is not in the cart, add it
                state.cartItems.push({
                    ...newItem,
                    quantity: 1
                });
            }

            // Update other state properties as needed
            state.cartItemsCount += 1;
            state.cartItemsTotal += newItem.price;
        },
        increment: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
                state.cartItemsTotal += item.price;
            }
        },
        decrement: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.cartItemsTotal -= item.price;
            }
        },
        remove: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.cartItemsTotal -= state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;
                state.cartItems.splice(itemIndex, 1);
                state.cartItemsCount -= 1;
            }
        },
     
        clear: (state) => {
            state.cartItems = [];
            state.cartItemsCount = 0;
            state.cartItemsTotal = 0;
        },
        setTotalCount:(state, action)=>{
            state.totalQuantity = action.payload ;
           
        },
        setTotalPrice:(state, action)=>{
            state.totalPrice = action.payload;
        }
    },
});

export const { add, increment, decrement, remove, clear, setTotalCount, setTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
