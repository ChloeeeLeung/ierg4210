import React, { useState, useEffect } from "react";
import logo from './assets/logo.jpg';
import styles from "../styles/Password.module.css";
import Image from "next/image";
import { Link } from 'react-router-dom';
import { generateNonce, validateNonce } from '../public/nonceUtils';

export default function Password() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [validate, setValidate] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [nonce, setNonce] = useState('');

  useEffect(() => {
    setNonce(generateNonce());
  }, []);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleValidateClick = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    const response = await fetch(`/api/login?email=${userEmail}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const storedPassword = data.password || '';

    if (currentPassword !== '') {
      bcrypt.compare(currentPassword, storedPassword[0], function(err, result) {
        if (result === true) {
          setValidate(true);
          setError('');
        } else {
          setValidate(false);
          setError('Wrong password. Please try again.');
        }
      });
    } else {
      setError('This user email does not exist.');
    }
  };

  const handleUserPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const bcrypt = require('bcryptjs');

  const handleUpdateClick = async () => {
    if (currentPassword !== newPassword) {
      setError('');
      const isValidNonce = validateNonce(nonce, storedNonces);
      if (!isValidNonce) {
        setError('Invalid nonce');
        return;
      }
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newPassword, salt, async function (err, hash) {
          const hashedPassword = hash;
          try {
            const response = await fetch('/api/updatePassword', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userEmail, hashedPassword }),
            });

            if (response.ok) {
              fetch('/api/delCookie', { method: 'GET' });
              localStorage.removeItem("userName"); 
              window.location.href = '/';
            } else {
              setError('Error logging in:', response.statusText);
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        });
      });
    } else {
      setError('The new password cannot be the same as the current password.');
    }
  };

  const storedNonces = [nonce]; 

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Image src={logo} className={styles.AppLogo} alt="logo" />
        <h4>CERAMIC WORLD</h4>
      </header>
      <body className={styles.AppBody}>
        <p className={styles.Welcome}>Update Password</p>
        <label className={styles.Error}>{error}</label>
        <div>
          <br />
          <label className={styles.Label}>Email</label>
          <input type="text" id="userEmail" name="userEmail" value={userEmail} onChange={handleUserEmailChange} required />
          <br />
          <label className={styles.Label}>Current Password</label>
          <input type="text" id="currentPassword" name="currentPassword" value={currentPassword} onChange={handleCurrentPasswordChange} required />
          <br />
          {!validate && (
            <div>
              <br />
              <button className={styles.Submit} onClick={handleValidateClick}>Validate</button>
            </div>
          )}

          {validate && (
            <div>
              <br />
              <label className={styles.Label}>New Password</label>
              <input type="text" id="newPassword" name="newPassword" value={newPassword} onChange={handleUserPasswordChange} required />
              <br />
              <br />
              <input type="hidden" name="nonce" value={nonce} />
              <button className={styles.Submit} onClick={handleUpdateClick}>Update</button>
            </div>
          )}
          <Link to={'/'}><p className={styles.Back}>Back to Home Page</p></Link>
        </div>
      </body>
    </div>
  );
}