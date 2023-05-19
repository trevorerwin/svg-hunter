import './styles/NavBar.css';

const NavBar = (props) => {
  return (
    <nav className='navbar'>
      <ul className='nav-list'>
        <li className='nav-list-item'>
          <a href='#'>Home</a>
        </li>
        <li className='nav-list-item'>
          <a href='#'>Login</a>
        </li>
        <li className='nav-list-item'>
          <a href='#'>SVG Finder</a>
        </li>
        <li className='nav-list-item'>
          <a href='#'>Help Guide</a>
        </li>
        <li className='nav-list-item'>
          <a href='#'>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
