import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../reducers/userReducers';
import { setRedirectPath } from '../reducers/redirectSlice';
const ProtectedRoute = ({ children }) => {
    const user = useSelector(selectUser);
    const location = useLocation();
    const dispatch = useDispatch();
    if (!user) {
        dispatch(setRedirectPath(location.pathname))
    console.log(user)
    return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
