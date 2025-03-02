import "./App.css";
import React, { useState } from "react";
  import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Survey from "./components/Survey";
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
          <Route path="/Home" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
      </div>
  );
}

export default App;
