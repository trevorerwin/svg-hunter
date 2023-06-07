import './styles/NavBar.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  // keep track of whether the menu is open or not
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navbar-container'>
      <nav className='navbar'>
        <div className='hamburger-menu' onClick={toggleMenu}>
          <div className={`line line-1 ${isOpen ? 'active' : ''}`} />
          <div className={`line line-2 ${isOpen ? 'active' : ''}`} />
          <div className={`line line-3 ${isOpen ? 'active' : ''}`} />
        </div>
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <NavLink to='/' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}>
            Home
          </NavLink>

          <NavLink to='/auth' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}>
            Login
          </NavLink>
          <NavLink to='/svg-hunter' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}>
            SVG Hunter
          </NavLink>
          <NavLink to='/contact' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}>
            Contact
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
