import styles from "../styles/Admin.module.css";
import logo from './assets/logo.jpg';
import Image from "next/image";
import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [newCategory, setNewCategory] = useState('');
  const [delCategory, setDelCategory] = useState('');

  const handleDelCategoryChange = (event) => {
    setDelCategory(event.target.value);
  };

  const handleDelCategoryClick = async () => {
    try {
      const response = await fetch('/api/delCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ delCategory }), 
      });

      if (response.ok) {
        console.log('Category deleted successfully!');
      } else {
        console.error('Error deleting category:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleNewCategoryClick = async () => {
    try {
      const response = await fetch('/api/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newCategory }), 
      });

      if (response.ok) {
        console.log('Category inserted successfully!');
      } else {
        console.error('Error inserting category:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const [categoryAll, setCategoryAll] = useState([]);


   useEffect(() => {
    fetch('/api/category')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCategoryAll(data.categoryAll);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
   }, []); 
  
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(undefined);
  const [productInventory, setProductInventory] = useState(undefined);
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(undefined);
  const [newProductCategory, setNewProductCategory] = useState('');
  
  const handleProductName = (event) => {
    setProductName(event.target.value);
  };
  const handleProductPrice = (event) => {
    setProductPrice(event.target.value);
  };
  const handleProductInventory = (event) => {
    setProductInventory(event.target.value);
  };
  const handleProductDescription = (event) => {
    setProductDescription(event.target.value);
  };
  const handleProductImage = (event) => {
    setProductImage(event.target.value);
  };
  const handleNewProductCategory = (event) => {
    setNewProductCategory(event.target.value);
  };

  const handleNewProductClick = async () => {
    try {
      const response = await fetch('/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, productPrice, productInventory, productDescription, productImage, newProductCategory }), 
      });

      if (response.ok) {
        console.log('Product inserted successfully!');
      } else {
        console.error('Error inserting product:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Image src={logo} className={styles.AppLogo} alt="logo" />
        <h4>CERAMIC WORLD - ADMIN PANEL</h4>
      </header>
      <body className={styles.AppBody}>
        <div>
    </div>
        <br></br>
        <h5 className={styles.Title}>New Category</h5>
        <form> 
          <label className={styles.Label}>Name </label>
          <input type="text" id="newCategory" name="newCategory" value={newCategory} onChange={handleNewCategoryChange} required/>
          <br></br>
          <button className={styles.Submit} onClick={handleNewCategoryClick}>Submit</button>
        </form>
        <br></br>
        <h5 className={styles.Title}>New Product</h5>
        <form>
          <label className={styles.Label}>Category </label>
          <select className={styles.Select} name="newProductCategory" id="newProductCategory" onChange={handleNewProductCategory} required> 
            {categoryAll.map((category) => (
              <option key={category.cid} value={category.cid}>{category.name}</option> 
            ))}
          </select>
          <br></br>
          <label className={styles.Label}>Name</label>
          <input type="text" id="productName" name="productName" onChange={handleProductName} required/>
          <br></br>
          <label className={styles.Label}>Price </label>
          <input type="number" id="productPrice" name="productPrice" onChange={handleProductPrice} required/>
          <br></br>
          <label className={styles.Label}>Inventory </label>
          <input type="number" id="productInventory" name="productInventory" onChange={handleProductInventory} required/>
          <br></br>
          <label className={styles.Label}>Description </label>
          <textarea type="text" id="productDescription" name="productDescription" onChange={handleProductDescription} required/>
          <br></br>
          <label className={styles.Label}>Image </label>
          <input className={styles.ImageButton} type="file" id="productImage" name="productImage" accept="image/jpeg, image/gif, image/png" onChange={handleProductImage} required />
          <br></br>
          <button className={styles.Submit} onClick={handleNewProductClick}>Submit</button>
        </form>
        <br></br>
        <h5 className={styles.Title}>Delete Category</h5>
        <form>
          <label className={styles.Label}>Category </label>
          <select className={styles.Select } name="category" id="category" onChange={handleDelCategoryChange} required> 
            {categoryAll.map((category) => (
              <option key={category.name} value={category.name}>{category.name}</option> 
            ))}
          </select>
          <br></br>
          <button className={styles.Submit} onClick={handleDelCategoryClick}>Submit</button>
        </form>
        <br></br>
        <h5 className={styles.Title}>Delete Product</h5>
        <form>
          <label className={styles.Label}>Category </label>
          <select className={styles.Select} name="category" id="category" required> 
            {categoryAll.map((category) => (
              <option key={category.cid} value={category.name}>{category.name}</option> 
            ))} 
          </select>
          <br></br>
          <label className={styles.Label}>Name </label>
          <select className={styles.Select} name="productName" id="productName" required> 
            <option value="decoration">product1</option> 
            <option value="tableware">product2</option> 
            <option value="vase">product3</option> 
            <option value="cup">product4</option> 
          </select>
          <br></br>
          <button className={styles.Submit}>Submit</button>
        </form>
      </body>
    </div>
  );
}