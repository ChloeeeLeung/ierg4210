import React, { useState } from "react";
import logo from './assets/logo.jpg';
import styles from "../styles/Login.module.css";
import Image from "next/image";

export default function Register() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const bcrypt = require('bcryptjs');

  const handleRegisterClick = async () => {
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

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Image src={logo} className={styles.AppLogo} alt="logo" />
        <h4>CERAMIC WORLD</h4>
      </header>
      <body className={styles.AppBody}>
        <p className={styles.Welcome}>Welcome, Guest!</p>
        <div>
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
            <button className={styles.Submit} onClick={handleRegisterClick}>Register</button>
          </form>
        </div>
      </body>
    </div>
  );
}