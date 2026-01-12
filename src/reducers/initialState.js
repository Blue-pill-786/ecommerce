const initialState = {
  user: {
    user: JSON.parse(sessionStorage.getItem('user')) || null,
  },
  cart: {
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0,
    status: 'idle', // idle | loading | success | error
    error: null,
  },
};

export default initialState;
