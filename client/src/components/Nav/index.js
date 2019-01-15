import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Online RPS
    </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Main
          </Link>
          </li>
          <li className="nav-item">
          
            <a
              href="/RPS"
              className={
                window.location.pathname === "/RPS"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              RPS
          </a>
          </li>
        </ul>
      </div>
      <ul className="navbar-nav nav justify-content-end" >
        <li className="nav-item nav-left">
          <Link
            to="/Login"
            className={
              window.location.pathname === "/Login"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Login
          </Link>
        </li>
        <li className="nav-item nav-left">
          <Link
            to="/SignUp"
            className={
              window.location.pathname === "/SignUp"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          
          <div id = "logout"
          className={
            window.location.pathname === "/SignUp"
              ? "nav-link active"
              : "nav-link"
          }
           onClick = {props.onClick}
           
          >
            Logout
        </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
