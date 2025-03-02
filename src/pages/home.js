import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
        {console.log("homepage")}
      <h1>Welcome to the Home Page</h1>
      <p>This is where the home page content goes.</p>
      <Link to="/input">
        <button
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Survey
        </button>
      </Link>
      
    </div>
  )
};

export default Home;