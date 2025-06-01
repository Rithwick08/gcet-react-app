import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({});
  const Navigate = useNavigate();
  
  const handleSubmit = () => {
    setUsers([...users, user]);
    Navigate("/login");
  };
  
  return (
    <main>
      <div className="form-container fade-in">
        <h3>Register</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
          />
        </div>
        <button className="btn btn-primary btn-block" onClick={handleSubmit}>
          Submit
        </button>
        
        {users.length > 0 && (
          <div className="user-list">
            <h4>Registered Users:</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              {users.map((value, index) => (
                <li key={index} className="user-item">
                  {value.name} - {value.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}