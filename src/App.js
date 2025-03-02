import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Welcome from './pages/welcome'; 
import Map from './pages/map';
import Input from './pages/input'

function App() {
  return (
    <div className="App">
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element ={<Input />}/>
          <Route path = "/map" element = {<Map />}/>
         

    </Routes>
    </div>
  );  
}

export default App;
