import "./styles/NavBar.css";
import React, { useState } from "react";

const NavBar = () => {
  // keep track of whether the menu is open or not
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`line line-1 ${isOpen ? "active" : ""}`} />
          <div className={`line line-2 ${isOpen ? "active" : ""}`} />
          <div className={`line line-3 ${isOpen ? "active" : ""}`} />
        </div>
        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <a href="/" className="navbar-ele">
            Home
          </a>
          <a href="/auth" className="navbar-ele">
            Login
          </a>
          <a href="/svg-hunter" className="navbar-ele">
            SVG Hunter
          </a>
          <a href="/contact" className="navbar-ele">
            Contact
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
