import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API}/register`;
      await axios.post(url, user);
      setMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        Navigate("/login");
      }, 1500);
    } catch (err) {
      setMsg("Registration failed. Please try again.");
      console.log(err);
    }
  };

  const goToLogin = () => {
    Navigate("/login");
  };

  return (
    <main>
      <div className="form-container fade-in">
        <h3>Register</h3>
        {msg && (
          <div className={`message ${msg.includes('successful') ? 'success' : 'error'}`}>
            {msg}
          </div>
        )}
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
        <button className="btn btn-secondary btn-block" onClick={goToLogin}>
          Already have an account? Login
        </button>

        {users && users.length > 0 && (
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