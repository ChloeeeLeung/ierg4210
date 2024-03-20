import React, { useState } from "react";
import logo from './assets/logo.jpg';
import styles from "../styles/Login.module.css";
import Image from "next/image";

export default function Login() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [salt, setSalt] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

    const bcrypt = require('bcryptjs'); //npm install bcryptjs

  const handleLoginClick = async () => {
  const response = await fetch(`/api/login?email=${userName}`, { method: 'GET' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  const storedSalt = data.salt || '';
  const storedPassword = data.password || '';
setSalt(storedSalt);

const combinedHash = storedSalt + userPassword;

bcrypt.compareSync(userPassword, storedPassword[0], function(err, result) {
  if (result === true) {
    console.log('Password is correct.');
  } else {
    console.log('Password is incorrect.', userPassword, storedPassword[0]);
  }
});


};

  const handleRegisterClick = async () => {
    const salt = bcrypt.genSaltSync(10);
    const combinedValue = salt + userPassword;
    const hashedPassword = bcrypt.hashSync(combinedValue, 10);
    console.log(hashedPassword);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, userPassword, hashedPassword, admin: true, salt }),
      });

      if (response.ok) {
        console.log('Register successfully!');
      } else {
        console.error('Error login:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
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
        <div>
            <label className={styles.Error}>{error}</label>
          <br></br>
          <label className={styles.Error}>{salt}</label>
          <br></br>
        <label className={styles.Error}>{password}</label>
          <br></br>
          <label className={styles.Label}>Admin Account </label>
          <input type="text" id="userName" name="userName" value={userName} onChange={handleUserNameChange} required />
          <br></br>
          <label className={styles.Label}>Admin Password </label>
          <input type="text" id="userPassword" name="userPassword" value={userPassword} onChange={handleUserPasswordChange} required />
          <br></br>
          <br></br>
          <button className={styles.Submit} onClick={handleLoginClick}>Login</button>
          <button className={styles.Submit} onClick={handleRegisterClick}>Register</button>
        </div>
      </body>
    </div>
  );
}