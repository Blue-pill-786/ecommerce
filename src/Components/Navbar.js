import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout, fetchUserFromStorage } from '../reducers/userReducers';
import '../css/navbar.css';

const logo = require('../images/online-shop.png');
const cart = require('../images/trolley.png');

export const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItemsCount = useSelector((state) => state.cart.cartItemsCount);
    const user = useSelector(selectUser);

    // Fetch user from sessionStorage on component mount
    useEffect(() => {
        dispatch(fetchUserFromStorage());
    }, [dispatch]);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        dispatch(logout());
        navigate('/login');
    };

    const handleLogin = () => {
        if (!user) {
            navigate('/login');
        }
    };

    const handleCartClick = () => {
        navigate('/cartproducts');
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <div className='navbox'>
            <div onClick={handleHome} className='leftside'>
                <img src={logo} alt="Logo" className='logo' onClick={handleHome} />
                <h1>Shopping Sale</h1>
            </div>
            <div className='rightside'>
                {user ? (
                    <>
                        <span className='name'>Welcome {user.displayName}</span>
                        <button className='logout-btn' onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <button className='login-btn' onClick={handleLogin}>Login</button>
                )}
                <div className='cart' onClick={handleCartClick}>
                    <img src={cart} alt='Cart Icon' className='cart-icon' />
                    <span className='cartCount'>{cartItemsCount}</span>
                </div>
            </div>
        </div>
    );
};
