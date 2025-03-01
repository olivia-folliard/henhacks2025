import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
          <Route path="/" element={<Home />} />
      </div>
    </Router>
  );  
}

export default App;
