import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


import { db } from '../Config/Config';
// Adjust the import path as needed

import '../css/products.css';
import { Navbar } from './Navbar';
import {  deleteDoc, doc, getDocs, collection } from 'firebase/firestore';

export const DeleteProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsList = [];
                querySnapshot.forEach((doc) => {
                    productsList.push({ id: doc.id, ...doc.data() });
                });
                setProducts(productsList);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    

    const handleDeleteProduct = async (productId) => {
        try {
 
            const productDocRef = doc(db, "products", productId.toString());
            await deleteDoc(productDocRef);
            setProducts(products.filter((product) => product.id !== productId));

            toast.success('Product Deleted From List!');
        } catch (error) {
            console.log(error);
            toast.error('Failed to Delete Product');
        }
    };

    return (
        <div>
            <Navbar/>
            <div className='product-main'>
                <h1 className='title-products'>Products</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='products-container'>
                        {products.map(product => (
                            <div className='product-card' key={product.id}>
                                <div className='product-img'>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className='product-name'>{product.name}</div>
                                <div className='product-price'>Rs {product.price}.00</div>
                                <button className='addcart-btn' onClick={() => handleDeleteProduct(product.id)}>Delete Product</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
