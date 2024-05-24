import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/Config';
import { add } from '../reducers/cartReducer'; // Adjust the path if necessary
import '../css/products.css';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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

    const handleAddToCart = (product) => {
        dispatch(add(product)); // Use the imported add action
        toast.success('Product added to cart!');
         
    };

    return (
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
                            <button className='addcart-btn' onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
