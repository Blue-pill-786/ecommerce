import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from './Navbar';
import { increment, decrement, remove, setTotalCount, setTotalPrice } from '../reducers/cartReducer';

import '../css/cart.css';
import bag from '../images/woman.png';
import { saveCartStateToFirebase } from '../Config/saveCart';
import { selectUser } from '../reducers/userReducers';  // Adjust the import if needed

export const Cart = () => {
    const dispatch = useDispatch();
    const shoppingCart = useSelector(state => state.cart.cartItems);
    const user = useSelector(selectUser);

 
    // Calculate total price and quantity
    const totalPrice = shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    console.log(totalPrice, totalQuantity);

    const handleIncrement = (item) => {
        dispatch(increment(item));
    };

    const handleDecrement = (item) => {
        dispatch(decrement(item));
    };

    const handleDelete = (item) => {
        dispatch(remove(item));
    };
    const handleSubmit =()=>{
        dispatch(setTotalPrice(totalPrice));
        dispatch(setTotalCount(totalQuantity));
       saveCartStateToFirebase(shoppingCart, totalPrice, totalQuantity, user)
    }

    return (
        <>
            <Navbar user={user} />
            <div className="hero">
                

                <div className='cart-container'>
                    {shoppingCart.length === 0 ? (
                        <div className='empty-cart'>
                            <div className="empty-cart-content">
                                <img className='bag' src={bag} alt='bag' />
                                <div>
                                    <div>Let's Go shopping</div>
                                    <div><Link to="/">Return to Home page</Link></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        shoppingCart.map((item, index) => (
                            <div className='cart-card' key={index}>
                                <div className='cart-img'>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className='cart-name'>{item.name}</div>
                                <div className='cart-price-original'>Rs {item.price}.00</div>
                                <div className='cart-actions'>
                                    <button className='cart-action-btn' onClick={() => handleDecrement(item)}>-</button>
                                    <div className='quantity'>{item.quantity}</div>
                                    <button className='cart-action-btn' onClick={() => handleIncrement(item)}>+</button>
                                </div>
                                <div className='cart-price'>
                                    Rs {item.price * item.quantity}.00
                                </div>
                                <button className='delete-btn' onClick={() => handleDelete(item)}>
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className='cart-summary'>
                    <div className='cart-summary-heading'>
                        Cart Summary
                    </div>
                    <div className='cart-summary-price'>
                        <span>Total Price</span>
                        <span>Rs {totalPrice}.00</span>
                    </div>
                    <div className='cart-summary-quantity'>
                        <span>Total Quantity</span>
                        <span>{totalQuantity}</span>
                    </div>
                    <Link to='/cashout'>
                        <button onClick={handleSubmit}>
                            Cash on Delivery
                        </button>
                    </Link>
                </div>
        </>
    );
};
