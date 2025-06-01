import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  
  const handleSubmit = () => {
    const found = users.find(
      (value) => value.email === user.email && value.pass === user.pass
    );
    if (found) {
      setMsg("Welcome " + found.name);
      setUser({ ...user, name: found.name, token: "123" });
      Navigate("/");
    } else {
      setMsg("Invalid User or Password");
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
