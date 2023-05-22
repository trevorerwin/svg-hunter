
import React from "react";
import "./App.css" 
import AuthToggle from "./Auth/AuthToggle";
import { Route, Routes } from "react-router-dom";

import Landing from "./Landing/Landing";


function App() {

 return (
    <div>
     <h1>Hello from appjsx</h1>
     <AuthToggle />
        {/* <Routes>
        <Route path="/" element={<AuthToggle />} />
        </Routes> */}
     <Landing />
    </div>
  );
}

export default App;
