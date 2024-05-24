// utils/localStorageUtils.js
export const saveCartStateToLocalStorage = (cartState) => {
    try {
        const serializedCartState = JSON.stringify(cartState);
        localStorage.setItem('cartState', serializedCartState);
    } catch (error) {
        console.error('Could not save cart state to local storage', error);
    }
};

export const loadCartStateFromLocalStorage = () => {
    try {
        const serializedCartState = localStorage.getItem('cartState');
        if (serializedCartState === null) {
            return undefined; // No cart state found in local storage
        }
        return JSON.parse(serializedCartState);
    } catch (error) {
        console.error('Could not load cart state from local storage', error);
        return undefined;
    }
};
