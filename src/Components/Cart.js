import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, remove } from '../reducers/cartReducer';
import { checkoutCart } from '../reducers/cartThunks';
import { selectUser } from '../reducers/userReducers';

import '../css/cart.css';
import bag from '../images/woman.png';

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    totalQuantity,
    status,
  } = useSelector(state => state.cart);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (status === 'success') {
      navigate('/cashout');
    }
  }, [status, navigate]);

  const handleSubmit = () => {
  if (!user) {
    navigate('/login');
    return;
  }
  dispatch(checkoutCart(user));
};

  return (
    <>
      <div className="hero">
        <div className="cart-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div>
                <img className="bag" src={bag} alt="Empty cart" />
                <div className="empty-title">Your cart is empty</div>
                <div className="empty-subtitle">
                  Looks like you haven’t added anything yet.
                </div>
                <Link to="/" className="empty-cta">
                  Browse products
                </Link>
              </div>
            </div>
          ) : (
            cartItems.map(item => (
              <div className="cart-card" key={item.id}>
                <div className="cart-img">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-name">{item.name}</div>
                <div className="cart-price-original">
                  Rs {item.price}.00
                </div>

                <div className="cart-actions">
                  <button
                    className="cart-action-btn"
                    disabled={status === 'loading'}
                    onClick={() => dispatch(decrement(item))}
                  >
                    −
                  </button>

                  <div className="quantity">{item.quantity}</div>

                  <button
                    className="cart-action-btn"
                    disabled={status === 'loading'}
                    onClick={() => dispatch(increment(item))}
                  >
                    +
                  </button>
                </div>

                <div className="cart-price">
                  Rs {item.price * item.quantity}.00
                </div>

                <button
                  className="delete-btn"
                  disabled={status === 'loading'}
                  onClick={() => dispatch(remove(item))}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-heading">Order Summary</div>

          <div className="cart-summary-price">
            <span>Total Price</span>
            <span>Rs {totalPrice}.00</span>
          </div>

          <div className="cart-summary-quantity">
            <span>Total Items</span>
            <span>{totalQuantity}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
          >
            {status === 'loading'
              ? 'Processing…'
              : 'Cash on Delivery'}
          </button>
        </div>
      )}
    </>
  );
};
