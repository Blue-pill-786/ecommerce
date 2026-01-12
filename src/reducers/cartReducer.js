import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';
import { checkoutCart } from './cartThunks';

const calculateTotals = (items) => {
  let totalPrice = 0;
  let totalQuantity = 0;

  items.forEach(item => {
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  return { totalPrice, totalQuantity };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState.cart,
    totalPrice: 0,
    totalQuantity: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    add: (state, action) => {
      const newItem = action.payload;
      const item = state.cartItems.find(i => i.id === newItem.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }

      Object.assign(state, calculateTotals(state.cartItems));
    },

    increment: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        Object.assign(state, calculateTotals(state.cartItems));
      }
    },

   decrement: (state, action) => {
  const itemIndex = state.cartItems.findIndex(
    i => i.id === action.payload.id
  );

  if (itemIndex === -1) return;

  if (state.cartItems[itemIndex].quantity > 1) {
    state.cartItems[itemIndex].quantity -= 1;
  } else {
    state.cartItems.splice(itemIndex, 1);
  }

  Object.assign(state, calculateTotals(state.cartItems));
},



    remove: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload.id
      );
      Object.assign(state, calculateTotals(state.cartItems));
    },

    clear: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      state.status = 'idle';
      state.error = null;
    },
  },

  // ✅ THIS IS WHAT WAS MISSING
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const {
  add,
  increment,
  decrement,
  remove,
  clear,
} = cartSlice.actions;

export default cartSlice.reducer;
