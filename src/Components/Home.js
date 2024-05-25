import React from 'react';
import { Navbar } from './Navbar.js';
import { Products } from './Products';
import { Link } from 'react-router-dom';


export const Home = () => {
    // Using useContext to access UserContext

    
    
    return (
        <>
            <Navbar  /> 
            <Products />
            <div>
                <h1>
                    <Link to='/addproducts'>

                    Add Products
                    </Link>
                    </h1>
                <h1>
                    <Link to='/delete'>

                    Delete Products
                    </Link>

                </h1>


            </div>
        </>
    );
};
