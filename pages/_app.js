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

  useEffect(() => {
    setIsServer(false);
  }, []);

  if (isServer) return null;

  const hierarchicalHomeMenu = [
    { name: 'Home', path: '/' },
  ];

  const hierarchicalDecorationMenu = [
    { name: 'Home', path: '/' },
    { name: 'Decoration', path: '/decoration' },
  ];

  const hierarchicalTablewareMenu = [
    { name: 'Home', path: '/' },
    { name: 'Tableware', path: '/tableware' },
  ];

  const hierarchicalVaseMenu = [
    { name: 'Home', path: '/' },
    { name: 'Vase', path: '/vase' },
  ];

  const hierarchicalCupMenu = [
    { name: 'Home', path: '/' },
    { name: 'Decoration', path: '/cup' },
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
          <Route
            exact
            path="/decoration"
            element={<Home hierarchicalMenu={hierarchicalDecorationMenu} />}
          />
          <Route
            exact
            path="/tableware"
            element={<Home hierarchicalMenu={hierarchicalTablewareMenu} />}
          />
          <Route
            exact
            path="/vase"
            element={<Home hierarchicalMenu={hierarchicalVaseMenu} />}
          />
          <Route
            exact
            path="/cup"
            element={<Home hierarchicalMenu={hierarchicalCupMenu} />}
          />
          {productList.map((product) => (
            <Route
              key={product.id}
              path={`/${product.id}/:product`}
              element={
                <Product
                  hierarchicalMenu={[
                    { name: 'Home', path: '/' },
                    { name: `${product.id}`, path: `/${product.id}` },
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