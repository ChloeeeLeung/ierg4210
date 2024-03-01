import React, { useState, useEffect } from 'react';
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [productNames, setProductNames] = useState([]);

  useEffect(() => {
    const fetchProductNames = async () => {
      const cartProduct = localStorage.getItem("cartProduct");
      if (cartProduct) {
        const parsedCartProduct = JSON.parse(cartProduct);
        setCartList(parsedCartProduct);
        const names = [];
        for (const cartProduct of parsedCartProduct) {
          const response = await fetch(`/api/productName?pid=${cartProduct.pid}`, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const productName = data.productName || 'error';
          names.push(productName);
        }
        setProductNames(names);
      }
    };

    fetchProductNames();
  }, []);

  const handleQuantityChange = (event, index) => {
    const updatedCartList = [...cartList];
    updatedCartList[index].quantity = event.target.value;
    setCartList(updatedCartList);
  };

  return (
    <div>
      {cartList.map((product, index) => (
        <div className={styles.RowContainer} key={index}>
          <h6 className={styles.LeftText}>{productNames[index]}</h6>
          <input
            type="number"
            className={styles.QuantityInput}
            min="0"
            value={product.quantity}
            onChange={(event) => handleQuantityChange(event, index)}
          />
          <h6 className={styles.LeftText}>${product.price}</h6>
        </div>
      ))}
      <hr className={styles.Line} />
      <button className={styles.Checkout}>Checkout</button>
    </div>
  );
}