import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/ProductList.module.css";
import productCandle1 from './assets/productCandle1.jpg';
import productCandle2 from './assets/productCandle2.jpg';
import productTableware1 from './assets/productTableware1.jpg';
import productTableware2 from './assets/productTableware2.jpg';
import productVase1 from './assets/productVase1.jpg';
import productVase2 from './assets/productVase2.jpg';
import productCup1 from './assets/productCup1.jpg';
import productCup2 from './assets/productCup2.jpg';
import Image from "next/image";

export default function ProductList({productAll}) {
  return (
    <div className={styles.ProductList}>
      {productAll.map((product, index) => (
        <div className={styles.ProductCard} key={index}>
          <Link to={`${location.pathname}/${product.name}`} state={{ product: product }}>
            {/* <Image fill={true} src={product.image} className={styles.ProductImg} alt={product.name} /> */}
          </Link>
          <Link to={{ pathname: `/Cup/${product.pid}`}} state={{ product: product }}>
            <h6 className={styles.ProductName}>{product.name}</h6>
          </Link>
          <h6 className={styles.ProductPrice}>{product.price}</h6>
          <button className={styles.AddToCart}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
}
