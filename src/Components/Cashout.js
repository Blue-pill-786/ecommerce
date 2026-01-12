import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { submitOrder } from '../reducers/orderThunks';
import { clear } from '../reducers/cartReducer';
import { selectUser } from '../reducers/userReducers';

import '../css/cashout.css';

export const Cashout = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔒 Guard: no empty cart
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    try {
      await dispatch(
        submitOrder({
          cartItems,
          totalPrice,
          totalQuantity,
          user,
          address,
          city,
          pinCode,
          paymentMethod,
          mobileNumber,
        })
      ).unwrap(); // 🔥 IMPORTANT

      dispatch(clear()); // 🧹 clear cart
      toast.success('Order placed successfully');
      navigate('/'); // later → /order-success
    } catch (error) {
      toast.error(error || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <label>Mobile Number</label>
        <input
          type="tel"
          value={mobileNumber}
          onChange={e => setMobileNumber(e.target.value)}
          required
        />

        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />

        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />

        <label>Pin Code</label>
        <input
          type="text"
          value={pinCode}
          onChange={e => setPinCode(e.target.value)}
          required
        />

        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">Select payment method</option>
          <option value="Paytm">Paytm</option>
          <option value="UPI">UPI</option>
          <option value="CreditCard">Credit Card</option>
          <option value="DebitCard">Debit Card</option>
        </select>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Placing order…' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};
