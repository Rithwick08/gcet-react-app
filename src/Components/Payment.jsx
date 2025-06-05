import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, email } = location.state || {};

  const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePlaceOrder = async () => {
    if (!email || !total) {
      setErrorMsg('Invalid order details.');
      return;
    }

    try {
      const response = await fetch(`${API}/orders/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, orderValue: total }),
      });

      if (response.ok) {
        localStorage.removeItem('cart');
        setOrderPlaced(true);
        setErrorMsg('');
      } else {
        setErrorMsg('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order error:', error);
      setErrorMsg('Error placing order. Please try again later.');
    }
  };

  if (!email || !total) {
    return <p>Invalid payment session. Please return to the cart.</p>;
  }

  return (
    <main className="payment-page">
      <div className="payment-container">
        <h2>Proceed to Payment</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Total Amount:</strong> ₹{total}</p>

        {!orderPlaced ? (
          <>
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Place Order
            </button>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </>
        ) : (
          <p className="success-msg">🎉 Your order has been placed successfully!</p>
        )}
      </div>
    </main>
  );
}
