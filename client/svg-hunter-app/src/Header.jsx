import NavBar from './NavBar';
import './styles/Header.css';
import headerVideo from './video/header-video.mp4';

const Header = (props) => {
  return (
    <>
      <div className='container-fluid text-center'>
        <div className='header-content'>
          <div className='logo-container'>
            <img src='http://www.svghunter.com/rw_common/images/svghunter_logo' className='logo-image' alt='SVG Hunter Logo' />
          </div>
          <h1 className='header-text'>SVG Hunter</h1>
        </div>
        <div className='video-container'>
          <video src={headerVideo} className='background-video' autoPlay loop muted></video>
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Header;
