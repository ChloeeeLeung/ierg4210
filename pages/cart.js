import React, { useState, useEffect, useRef } from 'react';
import styles from "../styles/Cart.module.css";

export default function Cart({updateCart}) {
  const [cartList, setCartList] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [productPrices, setProductPrices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPayPalScriptLoaded, setIsPayPalScriptLoaded] = useState(false);

  const [dbUUID, setdbUUID] = useState('');
  const dbUUIDRef = useRef(dbUUID); 
  useEffect(() => {
    dbUUIDRef.current = dbUUID;
  }, [dbUUID]);


  const userName = localStorage.getItem("userName");
  const UserName = userName? JSON.parse(userName)[0] : "Guest";

  useEffect(() => {
    const fetchProductDetail = async () => {
      const cartProduct = localStorage.getItem("cartProduct");
      if (cartProduct) {
        const parsedCartProduct = JSON.parse(cartProduct);
        setCartList(parsedCartProduct);
        const names = [];
        const prices = [];
        let total = 0;

        for (const cartProduct of parsedCartProduct) {
          const response = await fetch(`/api/productDetail?pid=${cartProduct.pid}`, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const productName = data.productName || 'error';
          const productPrice = data.productPrice || 'error';
          names.push(productName);
          prices.push(productPrice);

          const quantity = parseInt(cartProduct.quantity, 10);
          const price = parseFloat(productPrice);
          total += quantity * price;
        }

        setProductNames(names);
        setProductPrices(prices);
        setTotalAmount(total);
      }
    };

    fetchProductDetail();
  }, [updateCart]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=Ae1rSDiEdsuwu9Zi74SdXL7AOsmPgU8Yb55rAPJt_Oc5172xDlZzpRIn9Ixr37ijS6YbzYVG2k4O-F3I&components=buttons';
    script.async = true;
    script.onload = () => {
      setIsPayPalScriptLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  const handleQuantityChange = (event, index) => {
    const updatedCartList = [...cartList];
    updatedCartList[index].quantity = event.target.value;

    if (updatedCartList[index].quantity === '0') {
      const filteredCartList = updatedCartList.filter((item, i) => i !== index);
      setCartList(filteredCartList);
      localStorage.setItem("cartProduct", JSON.stringify(filteredCartList));
    } else {
      setCartList(updatedCartList);
      localStorage.setItem("cartProduct", JSON.stringify(updatedCartList));
    }

    let total = 0;
    for (let i = 0; i < updatedCartList.length; i++) {
      const quantity = parseInt(updatedCartList[i].quantity, 10);
      const price = parseFloat(productPrices[i]);
      total += quantity * price;
    }
    setTotalAmount(total);
  };


  useEffect(() => {
    if (isPayPalScriptLoaded) {
      paypal.Buttons({
        createOrder: async function (data, actions) {
          const url = new URL('/api/getOrder', window.location.href);
          url.searchParams.append('cartList', JSON.stringify(cartList));
          url.searchParams.append('userName', UserName);

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const orderDetails = await response.json();
          const { purchase_units } = orderDetails;

          if (orderDetails && orderDetails.purchase_units && orderDetails.purchase_units.length > 0) {
            const invoiceId = purchase_units[0].invoice_id;
            setdbUUID(invoiceId);
          } else {
            console.log('No purchase units found.');
          }

          return actions.order.create(orderDetails);
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function(orderData) {
            fetch('/api/saveOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderData }),
            });
            localStorage.removeItem("cartProduct"); 
            window.location.reload();
          });
        },
        onCancel: function (data) {
          console.log(dbUUIDRef.current);
          fetch('/api/delOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order: dbUUIDRef.current }),
          });
        },
      }).render('#paypal-button-container');
    }
  }, [isPayPalScriptLoaded]);

  return (
    <div>
      {cartList.map((product, index) => (
        <div className={styles.RowContainer} key={index}>
          <h6 className={styles.LeftText}>{productNames[index]}</h6>
          <input
            type="number"
            className={styles.QuantityInput}
            min="0"
            value={product.quantity}
            onChange={(event) => handleQuantityChange(event, index)}
          />
          <h6 className={styles.LeftText}>${productPrices[index]}</h6>
        </div>
      ))}
      <hr className={styles.Line} />
      <h6 className={styles.LeftText}>Total: ${totalAmount}</h6>
      {isPayPalScriptLoaded && (
        <div id="paypal-button-container" className={styles.Paypal}></div>
      )}
      {!isPayPalScriptLoaded && (
        <button className={styles.Checkout}>Checkout</button>
      )}
    </div>
  );
}
