import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API}/login`;
      const found = await axios.post(url, user);
      if (found.data.token) {
        setMsg("Welcome " + (found.data.name || "User"));
        setUser(found.data);
        Navigate("/");
      } else {
        setMsg("Invalid User or Password");
      }
    } catch (error) {
      setMsg("Login failed. Please try again.");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <main>
      <div className="form-container fade-in">
        <h3>Login</h3>
        {msg && (
          <div className={`message ${msg.includes('Welcome') ? 'success' : 'error'}`}>
            {msg}
          </div>
        )}
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
            placeholder="Password"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
          />
        </div>
        <button className="btn btn-primary btn-block" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-secondary btn-block" onClick={goToRegister}>
          Create Account
        </button>
      </div>
    </main>
  );
}