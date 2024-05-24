// rootReducer.js

import { combineReducers } from 'redux';
import user from './userReducer';
import cart from './cartReducer';

const rootReducer = combineReducers({
    user: user,
    cart: cart,
    // Add more reducers here as needed
});

export default rootReducer;
