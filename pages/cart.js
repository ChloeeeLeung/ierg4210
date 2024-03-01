import React, { useState, useEffect } from 'react';
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [productPrices, setProductPrices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const cartProduct = localStorage.getItem("cartProduct");
      if (cartProduct) {
        const parsedCartProduct = JSON.parse(cartProduct);
        setCartList(parsedCartProduct);
        const names = [];
        const prices = [];
        let total = 0;

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

          const quantity = parseInt(cartProduct.quantity, 10);
          const price = parseFloat(productPrice);
          total += quantity * price;
        }

        setProductNames(names);
        setProductPrices(prices);
        setTotalAmount(total);
      }
    };

    fetchProductDetail();
  }, []);

  const handleQuantityChange = (event, index) => {
    const updatedCartList = [...cartList];
    updatedCartList[index].quantity = event.target.value;

    if (updatedCartList[index].quantity === '0') {
      const filteredCartList = updatedCartList.filter((item, i) => i !== index);
      setCartList(filteredCartList);
      localStorage.setItem("cartProduct", JSON.stringify(filteredCartList));
    } else {
      setCartList(updatedCartList);
      localStorage.setItem("cartProduct", JSON.stringify(updatedCartList));
    }

    let total = 0;
    for (let i = 0; i < updatedCartList.length; i++) {
      const quantity = parseInt(updatedCartList[i].quantity, 10);
      const price = parseFloat(productPrices[i]);
      total += quantity * price;
    }
    setTotalAmount(total);
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
      <h6 className={styles.LeftText}>Total: ${totalAmount}</h6>
      <button className={styles.Checkout}>Checkout</button>
    </div>
  );
}
