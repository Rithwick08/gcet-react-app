import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Product() {
  const { user } = useContext(AppContext);
  
  return (
    <main>
      <div className="products-container fade-in">
        <h3>Welcome {user?.name ? user.name : 'Guest'}!</h3>
        <div className="welcome-message">
          Browse our amazing collection of products
        </div>
        <p>Product List</p>
        {/* Add your product grid/list here */}
      </div>
    </main>
  );
}