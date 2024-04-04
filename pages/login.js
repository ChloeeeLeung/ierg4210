import React, { useState, useEffect } from "react";
import logo from './assets/logo.jpg';
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { Link } from 'react-router-dom';
import { serialize } from 'cookie';
import { generateNonce, validateNonce } from '../public/nonceUtils';
import { v4 as uuidv4 } from 'uuid';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [nonce, setNonce] = useState('');
  const [order, setOrder] = useState([]);

  useEffect(() => {
    setNonce(generateNonce());
    fetch('/api/order')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setOrder(data.orders);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const bcrypt = require('bcryptjs'); // npm install bcryptjs

  const handleLoginClick = async (e) => {
    if(userEmail == '' || userPassword == ''){
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
    console.log(nonce);
    const response = await fetch(`/api/login?email=${userEmail}`, { method: 'GET' });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const storedPassword = data.password || '';
    const isAdmin = data.isAdmin || '';
    const name = data.name || 'Guest';
    
    if (storedPassword !== '') {
      bcrypt.compare(userPassword, storedPassword[0], async function (err, result) {
        if (result === true) {
          localStorage.setItem("userName", JSON.stringify(name));

          if(isAdmin == 1){
            const cookieOptions = {
              httpOnly: true,
              secure: true,
              expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              path: '/', 
            };
            const authCookie = serialize('auth', uuidv4(), cookieOptions);
            try {
              const cookieResponse = await fetch('/api/setCookie', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cookie: authCookie }),
              });

              if (cookieResponse.ok) {
                  window.location.href = '/admin';
              } else {
                console.error('Error setting cookie:', cookieResponse.statusText);
              }
            } catch (error) {
              console.error('An error occurred while setting cookie:', error);
            }
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
          <label className={styles.Label}> Email </label>
          <input type="text" id="userEmail" name="userEmail" value={userEmail} onChange={handleUserEmailChange} required />
          <br></br>
          <label className={styles.Label}> Password </label>
          <input type="text" id="userPassword" name="userPassword" value={userPassword} onChange={handleUserPasswordChange} required />
          <br></br>
          <br></br>
          <input type="hidden" name="nonce" value={nonce} />
          <button className={styles.Submit} onClick={handleLoginClick}>Login</button>
          <Link to={'/register'}><p className={styles.Register}>Click Here to Register</p></Link>

          <table className={styles.Table}>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>User Name</th>
              <th>Product</th>
              <th>Total Amount</th>
            </tr>
            {order.slice(order.length-5, order.length).map((order) => {
              const orderDetails = JSON.parse(order.orderDetails);
              const totalAmount = orderDetails ? orderDetails.reduce((sum, item) => {
                const quantity = parseInt(item.quantity);
                const unitAmount = parseFloat(item.unit_amount.value);
                return sum + quantity * unitAmount;
              }, 0) : 0;
              return (
                <tr key={order.UUID}>
                  <td>{order.UUID}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>{order.username}</td>
                  <td>
                    {Array.isArray(orderDetails) ? (
                      orderDetails.map(item => (
                        <p key={item.name}>
                          {`${item.quantity} ${item.name}: $${item.unit_amount.value}`}
                        </p>
                      ))
                    ) : (
                      <p>No order details available.</p>
                    )}
                  </td>
                  <td>{totalAmount.toFixed(2)}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </body>
    </div>
  );
}