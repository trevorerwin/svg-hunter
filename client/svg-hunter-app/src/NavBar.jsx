import './styles/NavBar.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const NavBar = (props) => {
  const [toggleMenuActive, setToggleMenuActive] = useState(true);

  const toggleMenu = () => {
    setToggleMenuActive(!toggleMenuActive);
  };

  return (
    <>
      <div className='navbar-container'>
        <nav className={`navbar ${toggleMenuActive ? 'active' : ''}`}>
          <div className='navbar-icon' onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Link to='/' className='navbar-ele-one navbar-ele'>
            Home
          </Link>
          <Link to='/auth' className='navbar-ele-two navbar-ele'>
            Login
          </Link>
          <Link to='/svg-hunter' className='navbar-ele-three navbar-ele'>
            SVG Hunter
          </Link>
          <Link to='/help-guide' className='navbar-ele-four navbar-ele'>
            Help Guide
          </Link>
          <Link to='/contact' className='navbar-ele-five navbar-ele'>
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
