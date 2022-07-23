import React, { useState,useEffect } from 'react';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/pages/Home';
import { Routes, Route, Navigate,BrowserRouter} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {

  let [check,setCheck] = useState(false)

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
         setCheck(true)
        } else {
          setCheck(false)
          
      }
    });
  }, [])
  

  


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
