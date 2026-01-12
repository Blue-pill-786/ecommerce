// reducers/cartThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveCartStateToFirebase } from '../Config/saveCart';

export const checkoutCart = createAsyncThunk(
  'cart/checkout',
  async (user, { getState, rejectWithValue }) => {
    if (!user) {
      return rejectWithValue('User not logged in');
    }

    try {
      const { cartItems, totalPrice, totalQuantity } =
        getState().cart;

      await saveCartStateToFirebase(
        cartItems,
        totalPrice,
        totalQuantity,
        user
      );

      return true; // ✅ REQUIRED
    } catch (error) {
      return rejectWithValue(
        error.message || 'Checkout failed'
      );
    }
  }
);
