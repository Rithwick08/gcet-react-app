import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToPayment = () => {
    const total = getCartTotal();
    navigate('/payment', { state: { total, email: user.email } });
  };

  if (cartItems.length === 0) {
    return (
      <main>
        <div className="cart-container fade-in">
          <h2>My Cart</h2>
          <p>Your cart is currently empty</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="cart-container fade-in">
        <h2>My Cart</h2>

        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <div className="item-details">
                <h4>{item.name}</h4>
                <p className="item-price">₹{item.price}</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="quantity-btn">-</button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="quantity-btn">+</button>
              </div>

              <div className="item-total">
                <p>₹{item.price * item.quantity}</p>
              </div>

              <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="total-section">
            <h3>Total: ₹{getCartTotal()}</h3>
          </div>

          <div className="cart-actions">
            <button onClick={clearCart} className="btn-common clear-cart-btn">
              Clear Cart
            </button>

            {user && user.email ? (
              <button onClick={proceedToPayment} className="btn-common proceed-payment-btn">
                Proceed to Payment
              </button>
            ) : (
              <button onClick={() => navigate('/login')} className="btn-common proceed-payment-btn">
                Login to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
