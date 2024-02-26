import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./index.js";
import Product from "./product.js";
import Admin from "./admin.js";
import "../styles/globals.css";

const productList = [
  { id: 'decoration' },
  { id: 'tableware' },
  { id: 'vase' },
  { id: 'cup' },
];

export default function App() {
  const [isServer, setIsServer] = useState(true);
  const [categoryAll, setCategoryAll] = useState([]);

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

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home hierarchicalMenu={hierarchicalHomeMenu} />}
          />
          {categoryAll.map((category) => (
            <Route
              path={`${category.name}`}
              element={<Home hierarchicalMenu={
                 [{ name: 'Home', path: '/' },{ name: category.name, path: `/${category.name}` },]
              } />}
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
                />
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            exact
            path="/admin"
            element={<Admin />}
          />
        </Routes>
      </Router>
    </>
  );
}