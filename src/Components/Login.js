// Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/Config';
import { setUser } from '../reducers/userReducers';
import { toast } from 'react-toastify';
import '../css/login.css';
import { selectRedirectPath, setRedirectPath } from '../reducers/redirectSlice';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirectPath = useSelector(selectRedirectPath);

    useEffect(() => {
        // Check if user exists in sessionStorage
        const userFromSession = sessionStorage.getItem('user');
        if (userFromSession) {
            const user = JSON.parse(userFromSession);
            dispatch(setUser(user));
            console.log(user)
            navigate('/');
        }
    }, [dispatch, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in sessionStorage
            const userData = {
                email: user.email,
                displayName: user.displayName
            };
            sessionStorage.setItem('user', JSON.stringify(userData));

            // Dispatch user data to Redux store
            dispatch(setUser(userData));

            // Redirect user to the previous page or home page
            if (redirectPath) {
                dispatch(setRedirectPath(null));
                navigate(redirectPath);
            } else {
                navigate("/");
            }
            toast.success('Login successful!');
        } catch (error) {
            let errorMessage = 'Login failed. Please check your credentials.';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found. Please sign up first.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <br />
            <h2>Login</h2>
            <br />
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'LOGIN'}
                </button>
                <p>
                    Don't have an account yet? Sign up <Link to="/signup">here</Link>.
                </p>
            </form>
        </div>
    );
};
