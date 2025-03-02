import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommunitySelection({ onSelectCommunity }) {
  const [community, setCommunity] = useState("");
  const navigate = useNavigate();

  const handleCommunitySelect = (selectedCommunity) => {
    setCommunity(selectedCommunity);
    onSelectCommunity(selectedCommunity); // Pass selected community to parent (App.js)
    navigate("/survey"); // Navigate to the survey page
  };

  return (
    <div>
      <h2>Select Your Community</h2>
      <div>
        <button onClick={() => handleCommunitySelect("Community A")}>Community A</button>
        <button onClick={() => handleCommunitySelect("Community B")}>Community B</button>
        <button onClick={() => handleCommunitySelect("Community C")}>Community C</button>
      </div>
    </div>
  );
}
