import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAddress } from '../Config/saveCart';
import { selectUser } from '../reducers/userReducers';
import '../css/cashout.css';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { clear } from '../reducers/cartReducer';
export const Cashout = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const shoppingCart = useSelector(state => state.cart.cartItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        saveAddress(shoppingCart, totalPrice, totalQuantity, user, address, paymentMethod);
        dispatch(clear());
        navigate('/');
    };



    return (

      <div>
          <Navbar/>
            <h2>Cashout</h2>
            <form onSubmit={handleSubmit}>
                <div className='form'>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <div className='form'>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='form'>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div className='form'>
                    <label htmlFor="pinCode">Pin Code</label>
                    <input
                        type="text"
                        id="pinCode"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        required
                    />
                </div>
                <div className='form'>
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Upi">Upi</option>
                        <option value="CreditCard">Credit Card</option>
                        <option value="DebitCard">Debit Card</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
