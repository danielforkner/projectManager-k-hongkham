import React from "react";
import useAuth from "../hooks/userAuth";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import Login from "./Login";
import LoginBtn from "./LoginBtn";

const Navbar = () => {
  const { user } = useAuth();
  const { loggedIn, setLoggedIn } = useLogin();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                to="/Home"
                className="nav-link active"
                aria-current="page"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/Projects"
                style={{ textDecoration: "none" }}
                className="nav-link dropdown-toggle"
                id="dropdown04"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Projects
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/CompanyDirectory"
                style={{ textDecoration: "none" }}
                className="nav-link dropdown-toggle"
                id="dropdown04"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Company Directory
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/Customers"
                style={{ textDecoration: "none" }}
                className="nav-link dropdown-toggle"
                id="dropdown04"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <LoginBtn setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            </li>
          </ul>

          {loggedIn && (
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;