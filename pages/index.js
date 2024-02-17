import { Link, useLocation } from "react-router-dom";
import React from "react";
import styles from "../styles/Home.module.css";
import ProductList from './productList.js';
import logo from './assets/productCandle1.jpg';
import Image from "next/image";

export default function Home({ hierarchicalMenu }) {
const location = useLocation();
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Image src={logo} className={styles.AppLogo} alt="logo" />
        <h4>CERAMIC WORLD</h4>
      </header>
      <body className={styles.AppBody}>
        <nav className={styles.ShoppingList }>
          <h6 className={styles.ShoppingList }>Shopping List</h6>
          <div className={styles.Submenu }>
            <div className={ styles.RowContainer}>
              <h6 className={ styles.LeftText}>Candle Container</h6>
              <input type="number" className={styles.QuantityInput} />
              <h6 className={ styles.LeftText}>$ 150</h6>
            </div>
             <div className={styles.RowContainer}>
              <h6 className={ styles.LeftText}>Candle Container</h6>
              <input type="number" className={styles.QuantityInput} />
              <h6 className={ styles.LeftText}>$ 150</h6>
            </div>
            <hr className='Line' />
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
          <Link to="/decoration">
            <button className={styles.CatagoriesButton}>Decoration</button>
          </Link>
          <Link to="/tableware">
            <button className={styles.CatagoriesButton}>Tableware</button>
          </Link>
          <Link to="/vase">
            <button className={styles.CatagoriesButton}>Vase</button>
          </Link>
          <Link to="/cup">
            <button className={styles.CatagoriesButton}>Cup</button>
          </Link>
        </div>
        <ProductList/>
      </body>
    </div>
  );
}
