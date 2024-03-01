import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import styles from "../styles/Home.module.css";
import ProductList from './productList.js';
import logo from './assets/logo.jpg';
import Image from "next/image";
import Cart from './cart.js';

export default function Home({ hierarchicalMenu }) {
  const location = useLocation();

  const [categoryAll, setCategoryAll] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const searchProduct = async (category) => {
    try {
      const response = await fetch(`/api/product?cid=${category}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProductAll(data.productAll);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

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
            <Cart/>
          </div>
        </nav>
        <nav className={styles.Hierarchical}>
          {hierarchicalMenu.map((item, index) => (
            <React.Fragment key={item.path}>
              {index !== 0 && ' > '}
              <Link to={item.path} onClick={()=>router.reload()}>
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>
        <div className={styles.Row}>
          {categoryAll.map((category) => (
            <Link to={`/${category.name}`}>
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
        <ProductList productAll={productAll} />
      </body>
    </div>
  );
}