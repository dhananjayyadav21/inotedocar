import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";

const Navbar = () => {
  let location = useLocation();

  //navigate
  const navigate = useNavigate();

  //alert using AlertContext
  const Context = useContext(AlertContext);
  const { showAlert } = Context;

  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logout User", "danger")
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
          iNoteDocar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-normal">
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link className="btn btn-warning mx-1 rounded-4" to="/login">
                  login
                </Link>
                <Link className="btn btn-warning mx-1 rounded-4" to="/Register">
                  Sign Up
                </Link>
              </form>
            ) : ( <>
              <Link to="/user" className="btn btn-danger mx-1 rounded-4">
              <i className="fa-solid fa-user-shield"></i>
              </Link> <Link onClick={handleLogout} className="btn btn-danger mx-1 rounded-4">
                Log Out
              </Link> </> )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
