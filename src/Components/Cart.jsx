// // import React from 'react';

// // export default function Cart() {
// //   return (
// //     <main>
// //       <div className="cart-container fade-in">
// //         <h2>My Cart</h2>
// //         <p>Your cart is currently empty</p>
// //       </div>
// //     </main>
// //   );
// // }
// import React, { useState, useEffect } from 'react';

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // Fetch cart items from localStorage when component mounts
//     const loadCartFromStorage = () => {
//       try {
//         const storedCart = localStorage.getItem('cart');
//         if (storedCart) {
//           setCartItems(JSON.parse(storedCart));
//         }
//       } catch (error) {
//         console.error('Error loading cart from localStorage:', error);
//       }
//     };

//     loadCartFromStorage();
//   }, []);

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }

//     const updatedCart = cartItems.map(item =>
//       item._id === productId
//         ? { ...item, quantity: newQuantity }
//         : item
//     );

//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const removeFromCart = (productId) => {
//     const updatedCart = cartItems.filter(item => item._id !== productId);
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem('cart');
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <main>
//         <div className="cart-container fade-in">
//           <h2>My Cart</h2>
//           <p>Your cart is currently empty</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main>
//       <div className="cart-container fade-in">
//         <h2>My Cart</h2>
        
//         <div className="cart-items">
//           {cartItems.map(item => (
//             <div key={item._id} className="cart-item">
//               <div className="item-details">
//                 <h4>{item.name}</h4>
//                 <p className="item-price">₹{item.price}</p>
//               </div>
              
//               <div className="quantity-controls">
//                 <button 
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="quantity-btn"
//                 >
//                   -
//                 </button>
//                 <span className="quantity">{item.quantity}</span>
//                 <button 
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="quantity-btn"
//                 >
//                   +
//                 </button>
//               </div>
              
//               <div className="item-total">
//                 <p>₹{item.price * item.quantity}</p>
//               </div>
              
//               <button 
//                 onClick={() => removeFromCart(item._id)}
//                 className="remove-btn"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
        
//         <div className="cart-summary">
//           <div className="total-section">
//             <h3>Total: ₹{getCartTotal()}</h3>
//           </div>
          
//           <div className="cart-actions">
//             <button onClick={clearCart} className="clear-cart-btn">
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadCartFromStorage = () => {
//       try {
//         const storedCart = localStorage.getItem('cart');
//         if (storedCart) {
//           setCartItems(JSON.parse(storedCart));
//         }
//       } catch (error) {
//         console.error('Error loading cart from localStorage:', error);
//       }
//     };

//     loadCartFromStorage();
//   }, []);

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }

//     const updatedCart = cartItems.map(item =>
//       item._id === productId
//         ? { ...item, quantity: newQuantity }
//         : item
//     );

//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const removeFromCart = (productId) => {
//     const updatedCart = cartItems.filter(item => item._id !== productId);
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem('cart');
//   };

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const proceedToPayment = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user.token) {
//       navigate('/login');
//       return;
//     }
  
//     const total = getCartTotal();
//     navigate('/payment', { state: { total, email: user.email } });
//   };
  

//     try {
//       const response = await fetch('/orders/new', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ items: cartItems })
//       });

//       if (response.ok) {
//         clearCart();
//         alert('Order placed successfully!');
//         navigate('/orders');
//       } else {
//         alert('Failed to place order');
//       }
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('Error placing order');
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <main>
//         <div className="cart-container fade-in">
//           <h2>My Cart</h2>
//           <p>Your cart is currently empty</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main>
//       <div className="cart-container fade-in">
//         <h2>My Cart</h2>

//         <div className="cart-items">
//           {cartItems.map(item => (
//             <div key={item._id} className="cart-item">
//               <div className="item-details">
//                 <h4>{item.name}</h4>
//                 <p className="item-price">₹{item.price}</p>
//               </div>

//               <div className="quantity-controls">
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                   className="quantity-btn"
//                 >
//                   -
//                 </button>
//                 <span className="quantity">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                   className="quantity-btn"
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="item-total">
//                 <p>₹{item.price * item.quantity}</p>
//               </div>

//               <button
//                 onClick={() => removeFromCart(item._id)}
//                 className="remove-btn"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="cart-summary">
//           <div className="total-section">
//             <h3>Total: ₹{getCartTotal()}</h3>
//           </div>

//           <div className="cart-actions">
//             <button onClick={clearCart} className="clear-cart-btn">
//               Clear Cart
//             </button>
//             <button onClick={proceedToPayment} className="proceed-btn">
//               Proceed to Payment
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    };

    loadCartFromStorage();
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
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      navigate('/login');
      return;
    }

    const total = getCartTotal();
    navigate('/payment', { state: { total, email: user.email } });
  };

  // Optional: Function to place order directly (not used here)
  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      alert('User not logged in');
      return;
    }

    try {
      const response = await fetch('/orders/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems, userId: user._id }),
      });

      if (response.ok) {
        clearCart();
        alert('Order placed successfully!');
        navigate('/orders');
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
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
            <button onClick={proceedToPayment} className="btn-common proceed-payment-btn">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
