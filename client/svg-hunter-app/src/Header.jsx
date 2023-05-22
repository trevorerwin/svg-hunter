import NavBar from './NavBar';
import './styles/Header.css';
import headerVideo from './video/header-video.mp4';

const Header = (props) => {
  return (
    <>
      <div className='container-fluid text-center header-container'>
        <div className='header-content'>
          <div className='logo-container'>
            <img src='http://www.svghunter.com/rw_common/images/svghunter_logo' className='logo-image' alt='SVG Hunter Logo' />
          </div>
          <h1 className='header-text'>SVG Hunter</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
