import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/Config';
import { setUser, selectUser } from '../reducers/userReducers';
import { toast } from 'react-toastify';
import '../css/login.css';
import {
  selectRedirectPath,
  clearRedirectPath
} from '../reducers/redirectSlice';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectPath = useSelector(selectRedirectPath);
  const user = useSelector(selectUser);

  // Restore session only (NO navigation here)
  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (stored && !user) {
      dispatch(setUser(JSON.parse(stored)));
    }
  }, [dispatch, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };

      sessionStorage.setItem('user', JSON.stringify(userData));
      dispatch(setUser(userData));

      const target = redirectPath || '/';
      dispatch(clearRedirectPath());

      toast.success('Login successful!');
      navigate(target, { replace: true });
    } catch (error) {
      let msg = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found') {
        msg = 'User not found. Please sign up first.';
      } else if (error.code === 'auth/wrong-password') {
        msg = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'Invalid email address.';
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'LOGIN'}
        </button>

        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};
