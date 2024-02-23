import { Link, useLocation } from "react-router-dom";
import React from "react";
import styles from "../styles/Home.module.css";
import logo from './assets/logo.jpg';
import Image from "next/image";

export default function Admin() {
  const location = useLocation();

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Image src={logo} className={styles.AppLogo} alt="logo" />
        <h4>CERAMIC WORLD</h4>
      </header>
      <body className={styles.AppBody}>

      </body>
    </div>
  );
}