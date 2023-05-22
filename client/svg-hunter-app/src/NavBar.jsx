import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import './styles/NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <>
      <div className='navbar-container'>
        <nav className='navbar'>
          <Link to='/' className='navbar-ele-one'>
            Home
          </Link>
          <Link to='/auth' className='navbar-ele-two'>
            Login
          </Link>
          <Link to='/svg-hunter' className='navbar-ele-three'>
            SVG Hunter
          </Link>
          <Link to='/help-guide' className='navbar-ele-four'>
            Help Guide
          </Link>
          <Link to='/contact' className='navbar-ele-five'>
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
