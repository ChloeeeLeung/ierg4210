import { Link, useLocation } from "react-router-dom";
import React from "react";
import styles from "../styles/Admin.module.css";
import logo from './assets/logo.jpg';
import Image from "next/image";

export default function Admin() {
  const location = useLocation();

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Image src={logo} className={styles.AppLogo} alt="logo" />
        <h4>CERAMIC WORLD - ADMIN PANEL</h4>
      </header>
      <body className={styles.AppBody}>
        <br></br>
        <h5 className={styles.Title}>New Category</h5>
        <form>
          <label className={styles.Label}>Name </label>
          <input type="text" id="newCategory" name="newCategory" required/>
          <br></br>
          <button className={styles.Submit}>Submit</button>
        </form>
        <br></br>
        <h5 className={styles.Title}>New Product</h5>
        <form>
          <label className={styles.Label}>Category </label>
          <select className={styles.Select} name="category" id="category" required> 
            <option value="decoration">Decoration</option> 
            <option value="tableware">Tableware</option> 
            <option value="vase">Vase</option> 
            <option value="cup">Cup</option> 
          </select>
          <br></br>
          <label className={styles.Label}>Name</label>
          <input type="text" id="productName" name="productName" required/>
          <br></br>
          <label className={styles.Label}>Price    </label>
          <input type="text" id="productPrice" name="productPrice" required/>
          <br></br>
          <label className={styles.Label}>Description </label>
          <input type="text" id="productDescription" name="productDescription" required/>
          <br></br>
          <label className={styles.Label}>Image </label>
          <input className={styles.ImageButton} type="file" id="productImage" name="productImage" accept="image/jpeg, image/gif, image/png" required />
          <br></br>
          <button className={styles.Submit}>Submit</button>
        </form>
        <br></br>
        <h5 className={styles.Title}>Delete Category</h5>
        <form>
          <label className={styles.Label}>Category </label>
          <select className={styles.Select} name="category" id="category" required> 
            <option value="decoration">Decoration</option> 
            <option value="tableware">Tableware</option> 
            <option value="vase">Vase</option> 
            <option value="cup">Cup</option> 
          </select>
          <br></br>
          <button className={styles.Submit}>Submit</button>
        </form>
        <br></br>
        <h5 className={styles.Title}>Delete Product</h5>
        <form>
          <label className={styles.Label}>Category </label>
          <select className={styles.Select} name="category" id="category" required> 
            <option value="decoration">Decoration</option> 
            <option value="tableware">Tableware</option> 
            <option value="vase">Vase</option> 
            <option value="cup">Cup</option> 
          </select>
          <br></br>
          <label className={styles.Label}>Name </label>
          <select className={styles.Select} name="productName" id="productName" required> 
            <option value="decoration">product1</option> 
            <option value="tableware">product2</option> 
            <option value="vase">product3</option> 
            <option value="cup">product4</option> 
          </select>
          <br></br>
          <button className={styles.Submit}>Submit</button>
        </form>
      </body>
    </div>
  );
}