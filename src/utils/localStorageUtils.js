// src/utils/localStorageUtils.js

export const saveCartStateToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {
    console.error(e);
  }
};

export const loadCartStateFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : undefined;
  } catch (e) {
    return undefined;
  }
};
