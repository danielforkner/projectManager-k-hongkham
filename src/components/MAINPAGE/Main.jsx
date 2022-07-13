import React from "react";
import { Routes, Route } from "react-router-dom";

import useAuth from "../hooks/userAuth.js";

import Home from "./Home.jsx";
import Customers from "../CUSTOMERS/Customers.jsx";
import Directory from "../DIRECTORY/Directory.jsx";

const Main = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/Customers" element={<Customers />} />
      <Route path="/CompanyDirectory" element={<Directory />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Main;
