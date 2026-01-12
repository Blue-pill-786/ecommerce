import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../reducers/userReducers";

import "../css/navbar.css";
import logo from "../images/online-shop.png";
import cart from "../images/trolley.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItemsCount = useSelector(
    state => state.cart.totalQuantity
  );

  const user = useSelector(selectUser);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="navbox">
      <div className="leftside" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="nav-title">Shopping Sale</h1>
      </div>

      <div className="rightside">
        {user ? (
          <>
            <span className="name">Welcome {user.displayName}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        <div className="cart" onClick={() => navigate("/cart")}>
          <img src={cart} alt="Cart Icon" className="cart-icon" />
          {cartItemsCount > 0 && (
            <span className="cartCount">{cartItemsCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};
