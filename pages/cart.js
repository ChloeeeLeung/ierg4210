import React, { useState, useEffect } from 'react';
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [productName, setProductName] = useState([]);

  const searchProduct = async (productPid) => {
    try {
      const response = await fetch(`/api/productName?pid=${productPid}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProductName(data.productName);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const cartProduct = localStorage.getItem("cartProduct");
    if (cartProduct) {
      setCartList(JSON.parse(cartProduct));
    }
    cartList.forEach((cartProduct) => {
        searchProduct(cartProduct.pid);
      });
  }, []);

  return (
    <div>
      {cartList.map((product) => ( 
        <div className={styles.RowContainer}>
          <h6 className={styles.LeftText}>{product.pid}</h6>
          {productName.map((product, index) => (
            <h6>{product.name}</h6>
          ))}
          <input type="number" className={styles.QuantityInput} min="0" />
          <h6 className={styles.LeftText}>${product.price}</h6>
        </div>
      ))} 
      <hr className={styles.Line} />
      <button className={styles.Checkout}>Checkout</button>
    </div>
  );
}