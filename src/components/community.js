import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function CommunitySelection({ onSelectCommunity }) {
  const [location, setLocation] = useState(null);
  const [manualInput, setManualInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchCommunityFromCoords(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation({ name: "Location not available" });
        },
        { timeout: 10000 }
      );
    } else {
      setLocation({ name: "Geolocation is not supported by this browser" });
    }
  }, []);

  const fetchCommunityFromCoords = async (lat, lon) => {
    // API call
    const communityName = `Lat: ${lat}, Lon: ${lon}`; // actual API call
    setLocation({ latitude: lat, longitude: lon, name: communityName });
    onSelectCommunity(communityName);
    setLoading(false); //community is fetched
  };

  const handleManualSelection = (community) => {
    setSelectedCommunity(community);
    onSelectCommunity(community);
  };

  const saveFavorite = () => {
    if (selectedCommunity && !favorites.includes(selectedCommunity)) {
      setFavorites([...favorites, selectedCommunity]);
    }
  };

  const handleSubmit = () => {
    if (selectedCommunity) {
      navigate("/home"); // when a community is selected
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Welcome! Choose Your Community</h2>
      {loading ? (
        <p>Loading your location...</p>
      ) : location ? (
        <p>
          Your City: <strong>{location.name}</strong>
        </p>
      ) : (
        <p>Enable location or search manually.</p>
      )}

      <input
        type="text"
        placeholder="Search for a community"
        value={manualInput}
        onChange={(e) => setManualInput(e.target.value)}
        style={{
          margin: "10px 0",
          padding: "5px",
          width: "80%",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        {manualInput &&
          ["New York, New York", "Newark, DE", "Newark, NJ"].map(
            (community, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "80%",
                  padding: "15px",
                  margin: "5px 0",
                  borderRadius: "10px",
                  backgroundColor:
                    selectedCommunity === community ? "#D0EFFF" : "#f9f9f9", // highlight
                  cursor: "pointer",
                  boxShadow:
                    selectedCommunity === community
                      ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                      : "none",
                }}
                onClick={() => handleManualSelection(community)}
              >
                <span>{community}</span>

                <FaHeart
                  onClick={(e) => {
                    e.stopPropagation(); // heart click
                    saveFavorite();
                  }}
                  style={{
                    cursor: "pointer",
                    color: favorites.includes(community) ? "red" : "#ccc",
                    fontSize: "20px",
                  }}
                />
              </div>
            )
          )}
      </div>

      {selectedCommunity && (
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Check in to my community!
        </button>
      )}
    </div>
  );
}
