import React,{useState} from "react";
import logo from './assets/logo.jpg';
import styles from "../styles/Product.module.css";
import { Link, useLocation } from 'react-router-dom';
import Image from "next/image";
import Cart from './cart.js';

export default function Product({ hierarchicalMenu }) {
  const location = useLocation();
  const { product } = location?.state;
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

  const updateCartProduct = (updatedCartProduct) => {
    setCartProduct(updatedCartProduct);
  };

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
            <Cart updateCart={cartProduct}/>
          </div>
        </nav>
        <nav className={styles.Hierarchical}>
          {hierarchicalMenu.map((item, index) => (
            <React.Fragment key={item.path}>
              {index !== 0 && ' > '}
              <Link to={item.path} state={{ product: product }}>
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>
        <div className={styles.ProductPageCard}>
          <Image src={product.image} className={styles.ProductPageImg} alt={product.name} height={100} width={100} />
          <dir className={styles.ProductPageDetail}>
            <h3>{product.name}</h3>
            <h5>Price: {product.price}</h5>
            <h5>Inventory: {product.inventory}</h5>
            {product.inventory < 3 && (
              <h5 className={styles.Inventory}>Only {product.inventory} left!</h5>
            )}
            <h6>Description: {product.description}</h6>
            <button className={styles.AddToCart} onClick={() => addToCart({ pid: product.pid, quantity: 1 })}>Add To Cart</button>
          </dir>
        </div>
      </body>
    </div>
  );
}