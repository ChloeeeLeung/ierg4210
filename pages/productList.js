import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/ProductList.module.css";

export default function ProductList({ productAll }) {
  const location = useLocation();
  return (
    <div className={styles.ProductList}>
      {productAll.map((product, index) => (
        <div className={styles.ProductCard} key={index}>
          <Link to={{ pathname: `${location.pathname}/${product.pid}` }} state={{ product: product }}>
            <img src={product.image} className={styles.ProductImg} alt={product.name} height={100} width={100} />
          </Link>
          <Link to={{ pathname: `${location.pathname}/${product.pid}` }} state={{ product: product }}>
            <h6 className={styles.ProductName}>{product.name}</h6>
          </Link>
          <h6 className={styles.ProductPrice}>${product.price}</h6>
          <button className={styles.AddToCart}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
}