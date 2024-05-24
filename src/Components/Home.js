import React from 'react';
import { Navbar } from './Navbar.js';
import { Products } from './Products';


export const Home = () => {
    // Using useContext to access UserContext

    
    
    return (
        <>
            <Navbar  /> 
            <Products />
        </>
    );
};
