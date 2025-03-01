import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import your CSS file for styling

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Logo</Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          
          <li className="dropdown">
            <button class Name="dropbtn" onClick={toggleDropdown}>
              Dashboard
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <Link to="/welcome">Welcome</Link>
                <Link to="/map">map</Link>
            </div>
            
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
