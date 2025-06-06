import React, { useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user"); // Clear localStorage
    setUser(null); // Clear context
    Navigate("/login");
  }, []);
  

  return <div>Logging out...</div>;
}
