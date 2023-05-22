import './styles/App.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import NavBar from './NavBar';
import AuthToggle from './Auth/AuthToggle';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing/Landing';
import Contact from './Landing/Contact';

function App() {
  return (
    <div>
      <Header />
      <NavBar />

      <AuthToggle />
      {/* <Routes>
        <Route path="/" element={<AuthToggle />} />
        </Routes> */}
      <Landing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
