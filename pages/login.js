import React, { useState } from "react";
import logo from './assets/logo.jpg';
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { Link } from 'react-router-dom';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const bcrypt = require('bcryptjs'); // npm install bcryptjs

  const handleLoginClick = async (e) => {
    if(userEmail == '' || userPassword == ''){
      setError('Please fill in all the columns.')
      return;
    } else {
      setError('')
    } 

    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      setError('Please enter a valid email address.');
      return;
    } else {
      setError('')
    }

    const response = await fetch(`/api/login?email=${userEmail}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const storedPassword = data.password || '';
    const isAdmin = data.isAdmin || '';
    const name = data.name || 'Guest';

    if (storedPassword != '') {
      bcrypt.compare(userPassword, storedPassword[0], function(err, result) {
        if (result === true) {
          localStorage.setItem("userName", JSON.stringify(name));
          if (isAdmin == 1) {
            window.location.href = '/admin';
          } else {
            window.location.href = '/';
          }
        } else {
          setError('Wrong password. Please try again.');
        }
      });
    } else {
      setError('This user email does not exist.');
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Image src={logo} className={styles.AppLogo} alt="logo" />
        <h4>CERAMIC WORLD</h4>
      </header>
      <body className={styles.AppBody}>
        <p className={styles.Welcome}>Welcome, Guest!</p>
        <Link to={'/'}><p className={styles.Back}>Back to Home Page</p></Link>
        <div>
          <label className={styles.Error}>{error}</label>
          <br></br>
          <label className={styles.Label}> Email </label>
          <input type="text" id="userEmail" name="userEmail" value={userEmail} onChange={handleUserEmailChange} required />
          <br></br>
          <label className={styles.Label}> Password </label>
          <input type="text" id="userPassword" name="userPassword" value={userPassword} onChange={handleUserPasswordChange} required />
          <br></br>
          <br></br>
          <button className={styles.Submit} onClick={handleLoginClick}>Login</button>
          <Link to={'/register'}><p className={styles.Register}>Click Here to Register</p></Link>
        </div>
      </body>
    </div>
  );
}