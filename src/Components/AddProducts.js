import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/addproducts.css';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../Config/Config';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

export const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const filename = productImage.name;
      const mountainRef = ref(storage, filename);

      // Upload file to Cloud Storage
      const uploadTask = uploadBytes(mountainRef, productImage);
      
      // Wait for the upload to complete
      uploadTask.then(async (snapshot) => {
        console.log('Uploaded a file!');
        
        // Get the download URL of the uploaded file
        const imageUrl = await getDownloadURL(snapshot.ref);
        
        // Add product data to Firestore
        await addDoc(collection(db, 'products'), {
          name: productName,
          price: productPrice,
          image: imageUrl
        });

        alert('Product added successfully! 👍');
        navigate('/');
      });
    } catch (error) {
      console.error('Error adding product: ', error);
      alert(`Failed to add product: ${error.message}`);
    }

    setProductName('');
    setProductPrice('');
    setProductImage(null);
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <br />
        <label>Product Price</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <br />
        <label>Product Image</label>
        <input
          type="file"
          id="file"
          accept="image/jpeg, image/png"
          onChange={handleImageChange}
        />
        <br />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};
