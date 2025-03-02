import React, { useState, useEffect } from "react";

export default function CommunitySelection({ onSelectCommunity }) {
  const [location, setLocation] = useState(null);
  const [manualInput, setManualInput] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          // Fetch community name based on coordinates (placeholder function)
          fetchCommunityFromCoords(latitude, longitude);
        },
        () => console.log("Location access denied."),
        { timeout: 10000 }
      );
    }
  }, []);

  const fetchCommunityFromCoords = async (lat, lon) => {
    // Placeholder for reverse geocoding API
    const communityName = `Lat: ${lat}, Lon: ${lon}`; // Replace with actual API call
    setLocation({ latitude: lat, longitude: lon, name: communityName });
    onSelectCommunity(communityName);
  };

  const handleManualSelection = () => {
    if (manualInput) {
      setLocation({ name: manualInput });
      onSelectCommunity(manualInput);
    }
  };

  const saveFavorite = () => {
    if (location?.name && !favorites.includes(location.name)) {
      setFavorites([...favorites, location.name]);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Welcome! Choose Your Community</h2>
      {location ? (
        <p>Detected Location: <strong>{location.name}</strong></p>
      ) : (
        <p>Enable location or search manually.</p>
      )}
      
      <input
        type="text"
        placeholder="Search for a community"
        value={manualInput}
        onChange={(e) => setManualInput(e.target.value)}
        style={{ margin: "10px 0", padding: "5px" }}
      />
      <button onClick={handleManualSelection}>Select</button>
      
      {location?.name && (
        <button onClick={saveFavorite} style={{ marginLeft: "10px" }}>
          Save Favorite
        </button>
      )}
      
      {favorites.length > 0 && (
        <div>
          <h3>Saved Communities</h3>
          <ul>
            {favorites.map((fav, index) => (
              <li key={index} onClick={() => onSelectCommunity(fav)} style={{ cursor: "pointer" }}>
                {fav}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
