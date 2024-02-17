import React from "react";
import { Link, useLocation  } from "react-router-dom";
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

export default function ProductList() {
  const location = useLocation();

  let productList = [];

  if (location.pathname === '/decoration') {
    productList = [
      { name: 'Candle Container 1', price: '$150', image: productCandle1, pathname: location.pathname, inventory: 10 },
      { name: 'Candle Container 2', price: '$130', image: productCandle2, pathname: location.pathname, inventory: 5 },
      { name: 'Candle Container 3', price: '$120', image: productCandle1, pathname: location.pathname, inventory: 6 },
      { name: 'Candle Container 4', price: '$110', image: productCandle2, pathname: location.pathname, inventory: 2  },
      { name: 'Candle Container 5', price: '$100', image: productCandle1, pathname: location.pathname, inventory: 1  },
      { name: 'Candle Container 6', price: '$140', image: productCandle2, pathname: location.pathname, inventory: 1  },
    ];
  } else if (location.pathname === '/tableware') {
    productList = [
      { name: 'Tableware 1', price: '$50', image: productTableware1, pathname: location.pathname, inventory: 10 },
      { name: 'Tableware 2', price: '$120', image: productTableware2, pathname: location.pathname, inventory: 8 },
      { name: 'Tableware 3', price: '$70', image: productTableware1, pathname: location.pathname, inventory: 6 },
      { name: 'Tableware 4', price: '$10', image: productTableware2, pathname: location.pathname, inventory: 10 },
      { name: 'Tableware 5', price: '$580', image: productTableware1, pathname: location.pathname, inventory: 4 },
      { name: 'Tableware 6', price: '$70', image: productTableware2, pathname: location.pathname, inventory: 10 },
    ];
  } else if (location.pathname === '/vase') {
    productList = [
      { name: 'Vase 1', price: '$100', image: productVase1, pathname: location.pathname, inventory: 10 },
      { name: 'Vase 2', price: '$210', image: productVase2, pathname: location.pathname, inventory: 2 },
      { name: 'Vase 3', price: '$140', image: productVase1, pathname: location.pathname, inventory: 10 },
      { name: 'Vase 4', price: '$1800', image: productVase2, pathname: location.pathname, inventory: 1 },
      { name: 'Vase 5', price: '$1005', image: productVase1, pathname: location.pathname, inventory: 10 },
      { name: 'Vase 6', price: '$1040', image: productVase2, pathname: location.pathname, inventory: 3 },
    ];
  } else if (location.pathname === '/cup') {
    productList = [
      { name: 'Cup 1', price: '$20', image: productCup1, pathname: location.pathname, inventory: 5 },
      { name: 'Cup 2', price: '$120', image: productCup2, pathname: location.pathname, inventory: 10 },
      { name: 'Cup 3', price: '$210', image: productCup1, pathname: location.pathname, inventory: 3 },
      { name: 'Cup 4', price: '$250', image: productCup2, pathname: location.pathname, inventory: 10 },
      { name: 'Cup 5', price: '$420', image: productCup1, pathname: location.pathname, inventory: 2 },
      { name: 'Cup 6', price: '$270', image: productCup2, pathname: location.pathname, inventory: 9 },
    ];
  } else if (location.pathname === '/') {
    productList = [
      { name: 'Candle Container 1', price: '$150', image: productCandle1, pathname: '/decoration', inventory: 10 },
      { name: 'Tableware 1', price: '$50', image: productTableware1, pathname: '/tableware', inventory: 10 },
      { name: 'Vase 1', price: '$100', image: productVase1, pathname: '/vase', inventory: 10 },
      { name: 'Cup 1', price: '$20', image: productCup1, pathname: '/cup', inventory: 5 },
      { name: 'Candle Container 2', price: '$130', image: productCandle2, pathname: '/decoration', inventory: 5 },
      { name: 'Tableware 2', price: '$120', image: productTableware2, pathname: '/tableware', inventory: 8 },
      { name: 'Vase 2', price: '$210', image: productVase2, pathname: '/vase', inventory: 2 },
      { name: 'Cup 2', price: '$120', image: productCup2, pathname: '/cup', inventory: 10 },
      { name: 'Candle Container 3', price: '$120', image: productCandle1, pathname: '/decoration', inventory: 6 },
    ];
  }

  return (
    <div className={styles.ProductList}>
      {productList.map((product, index) => (
        <div className={styles.ProductCard} key={index}>
          <Link to={`${product.pathname}/${product.name}`} state={{ product: product }}>
            <Image src={product.image} className={styles.ProductImg} alt={product.name} />
          </Link>
          <Link to={{ pathname: `${product.pathname}/${product.name}` }} state={{ product: product }}>
            <h6 className={styles.ProductName}>{product.name}</h6>
          </Link>
          <h6 className={styles.ProductPrice}>{product.price}</h6>
          <button className={styles.AddToCart}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
}
