import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <Link to="/" class="navbar-brand">
        Covid-19
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <Link to="/" class="nav-item nav-link">
            Map
          </Link>
          <Link to="/news" class="nav-item nav-link">
            News
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
