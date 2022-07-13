import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/userAuth.js";

const LoginBtn = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const { user, setToken } = useAuth();

  const login = () => {
    setLoggedIn(true);
    console.log("login btn where we at?", loggedIn);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleLogin = () => {
    if (user.email) {
      logout();
    } else {
      login();
    }
  };

  return (
    <div id="login-logout-link" className="nav-link" onClick={handleLogin}>
      {user.email ? "Logout" : "Login"}
    </div>
  );
};

export default LoginBtn;
