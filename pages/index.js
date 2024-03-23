import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import styles from "../styles/Home.module.css";
import ProductList from './productList.js';
import logo from './assets/logo.jpg';
import Image from "next/image";
import Cart from './cart.js';

export default function Home({ hierarchicalMenu, searchProduct, product }) {
  const location = useLocation();
  const userName = localStorage.getItem("userName");
  const extractedUserName = userName ? JSON.parse(userName)[0] : "Guest";

  const [categoryAll, setCategoryAll] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartProduct, setCartProduct] = useState([]);

  const handleScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetch('/api/category')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCategoryAll(data.categoryAll);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    if (location.pathname === '/') {
      fetch('/api/allProduct')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setProductAll(data.allProducts);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if(location.pathname === '/'){
      fetch(`/api/allProduct`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setProductAll(prevProducts => [...prevProducts, ...data.allProducts]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [currentPage]);

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
        <div className={styles.Row}>
          <p className={styles.Welcome}>Welcome Back, {extractedUserName}</p>
          <Link to='/login'>
            <button className={styles.LoginButton}>
              Login
            </button>
          </Link>
        </div>
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
              <Link to={item.path} onClick={()=>{if(item.path == '/'){router.reload()}}}>
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>
        <div className={styles.Row}>
          {categoryAll.map((category) => (
            <Link to={`/${category.name}`} key={category.name}>
              <button
                className={styles.CategoriesButton}
                value={category.name}
                onClick={() => searchProduct(category.cid)}
              >
                {category.name}
              </button>
            </Link>
          ))}
        </div>
        <ProductList productAll={(location.pathname == '/')?productAll:product} updateCartProduct={updateCartProduct} />
      </body>
    </div>
  );
}