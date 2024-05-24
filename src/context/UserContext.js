// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Config/Config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user data exists in sessionStorage
        const userData = sessionStorage.getItem('user');
        if (userData) {
            // setUser(JSON.parse(userData));
        }

        // Listen for changes in authentication state
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
            // Save user data to sessionStorage
            if (firebaseUser) {
                sessionStorage.setItem('user', JSON.stringify(firebaseUser));
            } else {
                sessionStorage.removeItem('user');
            }
        });

        return () => unsubscribe();
    }, []); // Empty dependency array to run only on component mount

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};
