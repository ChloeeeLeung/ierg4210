import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductList.module.css";

export default function ProductList({ productAll, updateCartProduct  }) {
  const [categories, setCategories] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);

  const addToCart = (product) => {
    const cartProduct = JSON.parse(localStorage.getItem("cartProduct")) || [];
    const productExists = cartProduct.some((p) => p.pid === product.pid);

    if (!productExists) {
      const updatedCart = [...cartProduct, product];
      setCartProduct(updatedCart);
      localStorage.setItem("cartProduct", JSON.stringify(updatedCart));
      updateCartProduct(updatedCart);
    }
  };

  const searchCategory = async (cid) => {
    const response = await fetch(`/api/searchCategory?cid=${cid}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.category;
  };

  useEffect(() => {
    setCartProduct(JSON.parse(localStorage.getItem("cartProduct")));
    const fetchCategories = async () => {
      const categoryPromises = productAll.map((product) => searchCategory(product.cid));
      const resolvedCategories = await Promise.all(categoryPromises);
      setCategories(resolvedCategories);
    };

    fetchCategories();
  }, [productAll]);

  return (
    <div className={styles.ProductList}>
      {productAll.map((product, index) => (
        <div className={styles.ProductCard} key={index}>
          <Link
            to={{
              pathname:
                categories[index] &&
                `/${categories[index].map((category) => category).join(", ")}/${product.pid}`,
            }}
            state={{ product: product }}
          >
            <img
              src={product.image}
              className={styles.ProductImg}
              alt={product.name}
              height={100}
              width={100}
            />
          </Link>
          <Link
            to={{
              pathname:
                categories[index] &&
                `/${categories[index].map((category) => category).join(", ")}/${product.pid}`,
            }}
            state={{ product: product }}
          >
            <h6 className={styles.ProductName}>{product.name}</h6>
          </Link>
          <h6 className={styles.ProductPrice}>${product.price}</h6>
          <button className={styles.AddToCart} onClick={() => addToCart({ pid: product.pid, quantity: 1 })}>Add To Cart</button>
          {/* <p>{cartProduct.map((product, index) => (
          <li key={index}>{product.pid}</li>
        ))}</p> */}
        </div>
      ))}
    </div>
  );
}
