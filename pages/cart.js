import React from "react";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  return (
    <div>
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
      <hr className={styles.Line} />
      <button className={styles.Checkout}>Checkout</button>
    </div>
  );
}