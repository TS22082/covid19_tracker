import React from "react";
import "./Nav.css";
function Nav() {
  return (
    <div className="nav">
      <h1 className="nav-header">Covid-19 Tracker</h1>
      <nav>
        <p>
          <a href="/">Home</a>
        </p>
        <p>
          <a href="/news">News</a>
        </p>
      </nav>
    </div>
  );
}

export default Nav;
