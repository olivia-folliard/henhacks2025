import './App.css';
import React, {useState} from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Welcome from './pages/welcome'; 
import Map from './pages/map';
import Input from './pages/input'
import CommunitySelection from "./components/community";

function App() {
  const [selectedCommunity, setSelectedCommunity] = useState("");

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community); // Save selected community
  };
  return (
    <div className="App">
    <Routes>
    <Route path="/" element={<CommunitySelection onSelectCommunity={setSelectedCommunity} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/input" element ={<Input />}/>
          <Route path = "/map" element = {<Map />}/>
         

    </Routes>
    </div>
  );  
}

export default App;
