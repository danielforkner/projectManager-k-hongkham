import { useContext } from "react";
import { LoginContext } from "../context/LoginContext.jsx";

const useLogin = () => {
  const {
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
  } = useContext(LoginContext);

  return {
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
  };
};

export default useLogin;
