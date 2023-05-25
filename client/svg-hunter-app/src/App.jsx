import './App.css';
import React, { useState, useEffect } from 'react';
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
import AuthContext from './Auth/AuthContext';
import ForgotPassword from './Auth/ForgotPassword';


  function App() {
    const [token, setToken] = useState("");
    
    useEffect(() => {
  
      if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
      }
    }, []);
  
    function updateToken(newToken) {
      //update the state of toke
      setToken(newToken);
      // update our local storage
      localStorage.setItem("token", newToken);
    }
  return (
    <div>
      <Header />
      <NavBar />
      <AuthContext.Provider value ={{updateToken, token}}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<AuthToggle />} />
        <Route path='/svg-hunter' element={<SVGFinder />} />
        <Route path='/help-guide' element={<HelpGuide />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/checkout' element={<ProductDisplay />} />
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
      </Routes>
      </AuthContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
