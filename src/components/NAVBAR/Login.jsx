import React, { useState } from "react";
import useLogin from "../hooks/useLogin.js";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm.jsx";
import RegistrationForm from "./RegistrationForm.jsx";

const Login = ({ loggedIn, setLoggedIn }) => {
  const { registered, setRegistered } = useLogin();
  return (
    <Modal
      show={loggedIn}
      onHide={() => {
        setLoggedIn(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {" "}
      {registered ? (
        <RegistrationForm
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          registered={registered}
          setRegistered={setRegistered}
        />
      ) : (
        <LoginForm
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          registered={registered}
          setRegistered={setRegistered}
        />
      )}
    </Modal>
  );
};

export default Login;
