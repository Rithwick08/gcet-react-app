import React, { useEffect, useState } from 'react';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    console.error("Invalid user in localStorage");
  }

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API}/orders/${user.email}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  if (!user || !user.email) {
    return <div className="orders-page">Please log in to view your orders.</div>;
  }

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found for {user.email}.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order, idx) => (
            <li key={idx} className="order-item">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Order Value:</strong> ₹{order.orderValue}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
