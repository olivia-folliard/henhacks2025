import "./App.css";
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Survey from "./components/Survey";
import Welcome from "./components/Welcome";
import Home from './pages/home';
import Map from './pages/map';
import Input from './pages/input';
import CommunitySelection from "./components/community";

function App() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CommunitySelection onSelectCommunity={setSelectedCommunity} />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/input" element={<Input />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
