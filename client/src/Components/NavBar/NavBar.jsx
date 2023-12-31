import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div id="nav" className="navbar-container">
      <Link to="/">
        <button className="home-button">
          <h5>Home</h5>
        </button>
      </Link>
      {/* Conditionally render user library if logged in or navigate to login page
      if not logged in */}
      <Link to="/myLibrary">
        <button className="mylibrary-button" onClick="window.location.reload()">
          <h5>My Library</h5>
        </button>
      </Link>
    </div>
  );
}
