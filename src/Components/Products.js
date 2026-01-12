import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/Config';
import { add } from '../reducers/cartReducer';
import '../css/products.css';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(add(product));
    setAddedId(product.id);
    toast.success('Product added to cart');

    setTimeout(() => {
      setAddedId(null);
    }, 800);
  };

  if (loading) {
    return (
      <div className="product-main">
        <div className="skeleton-list">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="product-main">
      <h1 className="title-products">Products</h1>

      <div className="products-container">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-img">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-name">{product.name}</div>
            <div className="product-price">Rs {product.price}.00</div>

            <button
              className={`addcart-btn ${
                addedId === product.id ? 'added' : ''
              }`}
              onClick={() => handleAddToCart(product)}
            >
              {addedId === product.id ? '✓ Added' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
