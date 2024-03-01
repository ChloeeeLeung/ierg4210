import React, { useState, useEffect } from 'react';
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [productPrices, setProductPrices] = useState([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const cartProduct = localStorage.getItem("cartProduct");
      if (cartProduct) {
        const parsedCartProduct = JSON.parse(cartProduct);
        setCartList(parsedCartProduct);
        const names = [];
        const prices = [];
        for (const cartProduct of parsedCartProduct) {
          const response = await fetch(`/api/productDetail?pid=${cartProduct.pid}`, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const productName = data.productName || 'error';
          const productPrice = data.productPrice || 'error';
          names.push(productName);
          prices.push(productPrice);
        }
        setProductNames(names);
        setProductPrices(prices);
      }
    };

    fetchProductDetail();
  }, []);

  const handleQuantityChange = (event, index) => {
    const updatedCartList = [...cartList];
    updatedCartList[index].quantity = event.target.value;
    setCartList(updatedCartList);
    localStorage.setItem("cartProduct", JSON.stringify(cartList));
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
          <h6 className={styles.LeftText}>${productPrices[index]}</h6>
        </div>
      ))}
      <hr className={styles.Line} />
      <button className={styles.Checkout}>Checkout</button>
    </div>
  );
}