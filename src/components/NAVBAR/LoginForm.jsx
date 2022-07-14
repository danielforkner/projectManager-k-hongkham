import React from "react";
import { loginUser } from "../../axios/index.js";
import useAuth from "../hooks/userAuth.js";
import useLogin from "../hooks/useLogin.js";

const LoginForm = ({ setRegistered }) => {
  const { setToken } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loggedIn,
    setLoggedIn,
    setError,
    setErrorMessage,
  } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      setError(false);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setLoggedIn(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div>
      <header className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">Login</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            setLoggedIn(false);
            console.log("closing out modal login", loggedIn);
          }}
        ></button>
      </header>
      <div className="modal-body p-5 pt-0">
        <form>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="email"
              id="loginFormUserEmail"
              name="loginFormUserEmail"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="loginFormUserEmail">Email: </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="password"
              id="loginFormUserPassword"
              name="loginFormUserPassword"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password: </label>
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            onClick={(e) => handleLogin(e)}
          >
            Submit
          </button>
          <hr className="my-4" />
          <h2 className="fs-5 fw-bold mb-3">
            Or register using company access code
          </h2>
          <button
            className="w-100 mb-2 btn btn-md rounder-4 btn-primary"
            type="button"
            onClick={() => {
              setRegistered(true);
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
