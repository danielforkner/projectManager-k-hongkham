import React from "react";
import useLogin from "../hooks/useLogin.js";
import userAuth from "../hooks/userAuth.js";
import { registerUser } from "../../axios/index.js";
import { departments } from "../lists/departments.js";

const RegistrationForm = ({
  loggedIn,
  setLoggedIn,
  registered,
  setRegistered,
}) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
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
  } = useLogin();
  const { setToken } = userAuth();

  const handleRegistration = async (e) => {
    console.log("whats happening?");
    e.preventDefault();
    console.log("registering handled");
    try {
      if (password === confirmPassword && password.length > 0) {
        const response = await registerUser(
          email,
          password,
          firstName,
          lastName,
          department
        );
        setError(false);
        localStorage.setItem("token", response.token);
        setToken(response.token);
        setLoggedIn(false);
        console.log("is the user registered?", response);
      } else {
        setError(true);
        setErrorMessage(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div>
      <header className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">Sign Up</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="close"
          onClick={() => {
            setLoggedIn(false);
          }}
        />
      </header>
      <div className="modal-body p-5 pt-0">
        <form onSubmit={handleRegistration}>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="email"
              id="registrationFormEmail"
              name="registrationFormEmail"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="registrationFormEmail">Email:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="password"
              id="registrationPassword"
              name="registrationPassword"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              minLength={8}
            />
            <label htmlFor="registrationPassword">Password:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="password"
              id="registrationConfirmPassword"
              name="registrationConfirmPassword"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              minLength={8}
            />
            <label htmlFor="registrationConfirmPassword">
              Confirm Password:
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="registrationFirstName"
              name="registrationFirstName"
              placeholder="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
            <label htmlFor="registrationFirstName">First Name:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="registrationLastName"
              name="registrationLastName"
              placeholder="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
            <label htmlFor="registrationLastName">Last Name:</label>
          </div>
          <div className="form-floating mb-3">
            <select
              className="form-select"
              required=""
              value={department || ""}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <option value="">Choose...</option>
              {departments.map((department) => {
                return <option key={department.name}>{department.name}</option>;
              })}
            </select>
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            type="submit"
          >
            Submit
          </button>
          <hr className="my-4" />
          <h2 className="fs-5 fw-bold mb-3">Already have an account?</h2>
          <button
            className="w-100 mb-2 btn btn-md rounder-4 btn-primary"
            type="button"
            onClick={() => {
              setRegistered(false);
            }}
          >
            Sign In
          </button>
        </form>
        {error ? (
          <div className="errorMessage">
            <p>{`${errorMessage}`}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RegistrationForm;
