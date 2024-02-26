import React from "react";
import logo from './assets/logo.jpg';
import styles from "../styles/Product.module.css";
import { Link, useLocation } from 'react-router-dom';
import Image from "next/image";

export default function Product({ hierarchicalMenu }) {
  const location = useLocation();
  const { product } = location?.state;

  console.log(location.pathname);

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
            <hr className={styles.Line} />
            <button className={styles.Checkout}>Checkout</button>
          </div>
        </nav>
        <nav className={styles.Hierarchical}>
          {hierarchicalMenu.map((item, index) => (
            <React.Fragment key={item.path}>
              {index !== 0 && ' > '}
              <Link to={item.path} className={location.pathname === item.path ? 'active' : ''} state={{ product: product }}>
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>
        <div className={styles.ProductPageCard}>
          <Image src={product.image} className={styles.ProductPageImg} alt="Product 1" height={100} width={100} />
          <dir className={styles.ProductPageDetail}>
            <h3>{product.name}</h3>
            <h5>Price: {product.price}</h5>
            <h5>Inventory: {product.inventory}</h5>
            {product.inventory < 3 && (
              <h5 className={styles.Inventory}>Only {product.inventory} left!</h5>
            )}
            <h6>Description: {product.description	}.</h6>
            <button className={styles.AddToCart}>Add To Cart</button>
          </dir>
        </div>
      </body>
    </div>
  );
}