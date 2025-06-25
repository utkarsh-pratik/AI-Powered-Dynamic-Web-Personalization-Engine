// new proj/dashboard/src/Config.jsx
import React, { useState, useEffect } from "react";

const CONFIG_KEY = "personalization_config";

export default function Config() {
  const [inputValue, setInputValue] = useState("sports, politics, tech, other");

  useEffect(() => {
    const storedConfig = JSON.parse(localStorage.getItem(CONFIG_KEY));
    if (storedConfig && storedConfig.clusterLabels) {
      setInputValue(storedConfig.clusterLabels.join(", "));
    }
  }, []);

  const handleSave = () => {
    const newLabels = inputValue.split(",").map(s => s.trim()).filter(Boolean);
    if (newLabels.length > 0) {
      const newConfig = { clusterLabels: newLabels };
      localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
      alert("Configuration saved! Reload the demo page for changes to take effect.");
    } else {
      alert("Please enter at least one cluster label.");
    }
  };

  return (
    <div>
      <h2>Personalization Configuration</h2>
      <p>Manage the category labels used by the engine.</p>
      <div>
        <label htmlFor="clusterLabels">Cluster Labels (comma-separated):</label>
        <input
          id="clusterLabels"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: "400px", marginLeft: "10px" }}
        />
      </div>
      <button onClick={handleSave} style={{ marginTop: "10px" }}>Save Configuration</button>
    </div>
  );
}