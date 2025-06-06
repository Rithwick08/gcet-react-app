import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Products from "./Components/Products";
import Register from "./Components/Register";
import Payment from './Components/Payment';
import Orders from "./Components/Orders";

export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null); // Start as null

  // Load user from localStorage once on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Products />} />
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
