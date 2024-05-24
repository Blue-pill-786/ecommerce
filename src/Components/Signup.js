import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../css/signup.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Config/Config';

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Basic validation checks
        if (!name || !email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (password.length < 6) {
            toast.error('Password should be at least 6 characters.');
            return;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast.error('Please enter a valid email.');
            return;
        }

        try {
            setLoading(true);

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with name
            await updateProfile(auth.currentUser, { displayName: name });

            // User creation successful
            console.log("User created:", user);
            toast.success('Signup successful. Redirecting to login...');
            navigate('/login');
        } catch (error) {
            // Handle signup failure
            let errorMessage = 'Signup failed. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use. Please use a different email.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is not valid.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The password is too weak. Please use a stronger password.';
            }
            console.error("Error creating user:", error);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <br />
            <h2>Sign up</h2>
            <br />
            <form onSubmit={handleSignup}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                />
                <br />
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
                    autoComplete="new-password"
                    required
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing up...' : 'SUBMIT'}
                </button>
                <p>
                    Already have an account? Sign in <Link to="/login">here</Link>.
                </p>
            </form>
        </div>
    );
};
