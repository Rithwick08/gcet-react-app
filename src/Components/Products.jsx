// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from '../App';
// import './Products.css';

// export default function Product() {
//   const {user}= useContext(AppContext);
//   const [products,setProducts]=useState([]);
//   const API=import.meta.env.VITE_API_URL
//   useEffect(()=>{
//     fetch(`${API}/products/all`)
//       .then(res=>res.json())
//       .then(data=>setProducts(data))
//       .catch(er=>console.error(err));
//   }, []);
//   return (
//     <main>
//       <div className="products-container fade-in">
//         <h3>Welcome {user?.name?user.name:'Guest'}!</h3>
//         <div className="welcome-message">
//           Browse our amazing collection of products
//         </div>
//         <div className="products-grid">
//           {products.map(product=>(
//             <div key={product.id}className="product-card">
//               <h4>{product.name}</h4>
//               <p className="price">₹{product.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './Products.css';
import "./Cart.css"

export default function Product() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/products/all`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex(item => item._id === product._id);
      
      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <main>
      <div className="products-container fade-in">
        <h3>Welcome {user?.name ? user.name : 'Guest'}!</h3>
        <div className="welcome-message">
          Browse our amazing collection of products
        </div>
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <h4>{product.name}</h4>
              <p className="price">₹{product.price}</p>
              <button
  className="btn-add-to-cart"
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}