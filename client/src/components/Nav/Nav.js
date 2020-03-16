import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Covid-19
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <Link to="/" className="nav-item nav-link">
            Map
          </Link>
          <Link to="/news" className="nav-item nav-link">
            News
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
