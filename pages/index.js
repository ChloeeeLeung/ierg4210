import { Link, useLocation  } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import styles from "../styles/Home.module.css";
import ProductList from './productList.js';
import logo from './assets/logo.jpg';
import Image from "next/image";

export default function Home({ hierarchicalMenu }) {
  const location = useLocation();

  const [categoryAll, setCategoryAll] = useState([]);
  const [productAll, setProductAll] = useState([]);

  const test = async (category) => {
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pathname:category}), 
      });

      if (response.ok) {
        console.log('Category inserted successfully!');
      } else {
        console.error('Error inserting category:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    try {
      await fetch('/api/product')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProductAll(data.productAll);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
    
  };

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

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Image src={logo} className={styles.AppLogo} alt="logo" />
        <h4>CERAMIC WORLD</h4>
      </header>
      <body className={styles.AppBody}>
        <nav className={styles.ShoppingList}>
          <h6 className={styles.ShoppingList}>Shopping List</h6>
          <div className={styles.Submenu}>
            <div className={styles.RowContainer}>
              <h6 className={styles.LeftText}>Candle Container</h6>
              <input type="number" className={styles.QuantityInput} />
              <h6 className={styles.LeftText}>$ 150</h6>
            </div>
            <div className={styles.RowContainer}>
              <h6 className={styles.LeftText}>Candle Container</h6>
              <input type="number" className={styles.QuantityInput} />
              <h6 className={styles.LeftText}>$ 150</h6>
            </div>
            <hr className={styles.Line}/>
            <button className={styles.Checkout}>Checkout</button>
          </div>
        </nav>
        <nav className={styles.Hierarchical}>
          {hierarchicalMenu.map((item, index) => (
            <React.Fragment key={item.path}>
              {index !== 0 && ' > '}
              <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>
        <div className={styles.Row}>
          {categoryAll.map((category) => (
            <Link to={`/${category.name}`}>
              <button className={styles.CatagoriesButton} value={category.name} onClick={()=>test(category.cid)}>
                {category.name}</button>
            </Link>
            ))}
        </div>
        <ProductList productAll={productAll} />
      </body>
    </div>
  );
}