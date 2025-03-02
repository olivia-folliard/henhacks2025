import "./App.css";
import React, {useState}  from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
//import Home from "./components/Home";
import Survey from "./components/Survey";
import Welcome from "./components/Welcome";
import Home from './pages/home';
//import Welcome from './pages/welcome'; 
import Map from './pages/map';
import Input from './pages/input'
import CommunitySelection from "./components/community";
function App() {

  return (
      <div className="App">
        <Routes>
    <Route path="/" element={<CommunitySelection onSelectCommunity={setSelectedCommunity} />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/input" element ={<Input />}/>
          <Route path="/map" element = {<Map />}/>
        </Routes>
      </div>
  );
}

export default App;
