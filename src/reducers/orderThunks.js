import { clear } from './cartReducer';
import { saveAddress } from '../Config/saveCart';

export const submitOrder = (orderData) => {
  return async (dispatch) => {
    try {
      await saveAddress(
        orderData.cartItems,
        orderData.totalPrice,
        orderData.totalQuantity,
        orderData.user,
        orderData.address,
        orderData.paymentMethod,
        orderData.mobileNumber,
        orderData.city,
        orderData.pinCode
      );

      dispatch(clear());
      return true;
    } catch (error) {
      throw error;
    }
  };
};
