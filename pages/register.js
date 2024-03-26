import React, { useState, useEffect } from "react";
import logo from './assets/logo.jpg';
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { Link } from 'react-router-dom';
import { generateNonce, validateNonce } from './nonceUtils';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [nonce, setNonce] = useState('');

  useEffect(() => {
    setNonce(generateNonce());
  }, []);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleRegisterClick = async (e) => {
    if (userName === '' || userEmail === '' || userPassword === '') {
      setError('Please fill in all the columns.');
      return;
    } else {
      setError('');
    }

    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      setError('Please enter a valid email address.');
      return;
    } else {
      setError('');
    }

    const isValidNonce = validateNonce(nonce, storedNonces);
    if (!isValidNonce) {
      setError('Invalid nonce');
      return;
    }

    const bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(userPassword, salt, async function (err, hash) {
        const hashedPassword = hash;
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, userEmail, userPassword, hashedPassword, admin: false }),
          });

          if (response.ok) {
            console.log('Register successfully!');
            window.location.href = '/login';
          } else {
            console.error('Error login:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      });
    });
  };

  const storedNonces = [nonce]; 

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
          <form>
            <label className={styles.Label}>Name</label>
            <input type="text" id="userName" name="userName" value={userName} onChange={handleUserNameChange} required />
            <br></br>
            <label className={styles.Label}>Email</label>
            <input type="text" id="userEmail" name="userEmail" value={userEmail} onChange={handleUserEmailChange} required />
            <br></br>
            <label className={styles.Label}>Password</label>
            <input type="text" id="userPassword" name="userPassword" value={userPassword} onChange={handleUserPasswordChange} required />
            <br></br>
            <br></br>
            <input type="hidden" name="nonce" value={nonce} />
            <button className={styles.Submit} onClick={handleRegisterClick}>Register</button>
          </form>
        </div>
      </body>
    </div>
  );
}