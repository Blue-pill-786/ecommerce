// PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { selectUser } from '../reducers/userReducers';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useSelector(selectUser);

    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
