import './App.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import NavBar from './NavBar';
import AuthToggle from './Auth/AuthToggle';
import { Route, Routes } from 'react-router-dom';
import Contact from './Landing/Contact';
import Home from './Landing/Home';
import SVGFinder from './Landing/SVGFinder/SVGFinder';
import HelpGuide from './Landing/HelpGuide';
import ProductDisplay from './Auth/ProductDisplay';

function App() {
  return (
    <div>
      <Header />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<AuthToggle />} />
        <Route path='/svg-hunter' element={<SVGFinder />} />
        <Route path='/help-guide' element={<HelpGuide />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/checkout' element={<ProductDisplay />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
