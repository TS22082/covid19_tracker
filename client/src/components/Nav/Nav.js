import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="nav">
      <h1 className="nav-header">Covid-19 Tracker</h1>
      <nav>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/news">News</Link>
        </p>
      </nav>
    </div>
  );
}

export default Nav;
