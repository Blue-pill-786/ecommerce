import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../Config/Config';
import { toast } from 'react-toastify';
import '../css/addproducts.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../reducers/userReducers';


export const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  // Safety net (ProtectedRoute should already block)
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!productImage) {
      toast.error('Please select an image');
      return;
    }

    setSubmitting(true);
   


    try {
      const imageRef = ref(
        storage,
        `products/${Date.now()}-${productImage.name}`
      );

      const snapshot = await uploadBytes(imageRef, productImage);
      const imageUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'products'), {
        name: productName.trim(),
        price: Number(productPrice),
        image: imageUrl,
        createdAt: new Date(),
        createdBy: user.email,
      });

      toast.success('Product added successfully');
      navigate('/');

      setProductName('');
      setProductPrice('');
      setProductImage(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          required
        />

        <label>Product Price</label>
        <input
          type="number"
          value={productPrice}
          onChange={e => setProductPrice(e.target.value)}
          required
        />

        <label>Product Image</label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={e => setProductImage(e.target.files[0])}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding…' : 'ADD PRODUCT'}
        </button>
      </form>
    </div>
  );
};
