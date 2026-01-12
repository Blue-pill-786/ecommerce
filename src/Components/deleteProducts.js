import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Config/Config';
import { Navbar } from './Navbar';
import '../css/products.css';

export const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(list);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    if (deletingId) return;

    setDeletingId(productId);

    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts(prev =>
        prev.filter(product => product.id !== productId)
      );
      toast.success('Product deleted');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="product-main">
        <h1 className="title-products">Products</h1>

        {loading ? (
          <div>Loading…</div>
        ) : (
          <div className="products-container">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-img">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-name">{product.name}</div>
                <div className="product-price">Rs {product.price}.00</div>

                <button
                  className="addcart-btn"
                  onClick={() => handleDeleteProduct(product.id)}
                  disabled={deletingId === product.id}
                >
                  {deletingId === product.id
                    ? 'Deleting…'
                    : 'Delete Product'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
