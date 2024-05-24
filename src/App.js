import React, { Component } from 'react';
import {  Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home';
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { AddProducts } from './Components/AddProducts';
import { Cashout } from './Components/Cashout';
import { Cart } from './Components/Cart';
import { NotFound } from './Components/NotFound'; // Create this component to handle unknown routes
import ProtectedRoute from './Components/ProtectedRoute';
import { DeleteProduct } from './Components/deleteProducts';


export class App extends Component {

   

    render() {
        return (
           
      

          
                <Routes>
                    {/* Home */}
                    <Route exact path='/' element={<Home />} />

                    {/* Signup */}
                    <Route path='/signup' element={<Signup />} />

                    {/* Login */}
                    <Route path='/login' element={<Login />} />

                    {/* Cart products */}
                    <Route path='/cartproducts' element={<Cart />} />

                    {/* Add products */}
                    <Route path='/addproducts' element={
                        // <ProtectedRoute>  
                             <AddProducts />
                             //   </ProtectedRoute> 
                            } />

                    {/* Cashout */}
                    <Route path='/cashout' element={
                        <ProtectedRoute>
                            <Cashout />
                        </ProtectedRoute>
                    } />
                    <Route path='/delete' element={<DeleteProduct/>}/>
                    {/* Fallback for incorrect routes */}
                    <Route path='*' element={<NotFound />} />
                </Routes>
           
           
        );
    }
}

export default App;
