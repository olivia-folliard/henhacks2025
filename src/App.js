import "./App.css";
import React from "react";
  import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Survey from "./components/Survey";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
        </Routes
      </div>
  );
}

export default App;
