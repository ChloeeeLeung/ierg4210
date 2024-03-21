import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./index.js";
import Product from "./product.js";
import Admin from "./admin.js";
import Login from "./login.js";
import Register from "./register.js";
import "../styles/globals.css";

export default function App() {
  const [isServer, setIsServer] = useState(true);
  const [categoryAll, setCategoryAll] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setIsServer(false);
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
  }, []);

  if (isServer) return null;

  const hierarchicalHomeMenu = [
    { name: 'Home', path: '/' },
  ];

  const searchProduct = async (category) => {
    try {
      const response = await fetch(`/api/product?cid=${category}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data.productAll);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home hierarchicalMenu={hierarchicalHomeMenu} searchProduct={searchProduct} product={product} />}
          />
          {categoryAll.map((category) => (
            <Route
              key={category.name}
              path={`${category.name}`}
              element={
                <Home
                  hierarchicalMenu={[
                    { name: 'Home', path: '/' },
                    { name: category.name, path: `/${category.name}` },
                  ]}
                  searchProduct={searchProduct}
                  product={product}
                />
              }
            />
          ))}
          {categoryAll.map((category) => (
            <Route
              key={category.name} 
              path={`/${category.name}/:product`}
              element={
                <Product
                  hierarchicalMenu={[
                    { name: 'Home', path: '/' },
                    { name: `${category.name}`, path: `/${category.name}` },
                    { name: 'Product', path: '' },
                  ]}
                  searchProduct={searchProduct}
                />
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}