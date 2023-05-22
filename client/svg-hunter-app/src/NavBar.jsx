import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import './styles/NavBar.css';

const NavBar = (props) => {
  return (
    <>
      <div className='navbar-container'>
        <nav className='navbar'>
          <a className='navbar-ele-one' href='#'>
            Home
          </a>
          <a className='navbar-ele-two' href='#'>
            Login
          </a>
          <a className='navbar-ele-three' href='#'>
            SVG Hunter
          </a>
          <a className='navbar-ele-four' href='#'>
            Help Guide
          </a>
          <a className='navbar-ele-five' href='#'>
            Contact
          </a>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
