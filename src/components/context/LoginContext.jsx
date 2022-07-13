import React, { useState, useEffect } from "react";
import useAuth from "../hooks/userAuth.js";
export const LoginContext = React.createContext();

const LoginProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [department, setDepartment] = useState(user.department);
  const [position, setPosition] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");

  useEffect(() => {
    setError(false);
  }, []);

  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        registered,
        setRegistered,
        loggedIn,
        setLoggedIn,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        department,
        setDepartment,
        position,
        setPosition,
        officeNumber,
        setOfficeNumber,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
