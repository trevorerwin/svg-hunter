import React from "react";
import "./App.css" 
import AuthToggle from "./Auth/AuthToggle";
import { Route, Routes } from "react-router-dom";
import Landing from "./Landing/Landing";
import Contact from "./Landing/Contact";

function App() {

 return (
    <div>
     <AuthToggle />
        {/* <Routes>
        <Route path="/" element={<AuthToggle />} />
        </Routes> */}
     <Landing />
     <Contact />
    </div>
  );
    
        
    
}

export default App;
