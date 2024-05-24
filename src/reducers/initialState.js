const initialState = {
    user: {
        user: JSON.parse(sessionStorage.getItem('user')) || null
    },
    cart: {
        cartItems: [],
        cartItemsCount: 0,
        cartItemsTotal: 0,
        totalPrice: 0
    },
    // Add other parts of the state as needed
};

export default initialState;
