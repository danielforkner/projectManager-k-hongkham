import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./context/AuthContext.jsx";
import LoginProvider from "./context/LoginContext.jsx";
import CustomerProvider from "./context/CustomerContext.jsx";

import Navbar from "./NAVBAR/Navbar.jsx";
import Main from "./MAINPAGE/Main.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LoginProvider>
          <CustomerProvider>
            <Navbar />
            <Main />
          </CustomerProvider>
        </LoginProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
