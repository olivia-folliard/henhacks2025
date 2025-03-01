import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { Navbar } from 'react-bootstrap';
import {welcome} from '.../welcome'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<welcome />} />
          <Route path="/map" element ={<map/>}/>
        </Routes>
      </div>
    </Router>
  );  
}

export default App;
