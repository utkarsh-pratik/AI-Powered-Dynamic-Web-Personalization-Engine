// new proj/dashboard/src/Settings.jsx
import React from "react";

export default function Settings() {
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to delete all tracking data? This cannot be undone.")) {
      localStorage.removeItem("user_behavior_data");
      // This event ensures other components (like Analytics) update immediately.
      window.dispatchEvent(new Event("storage"));
      alert("All tracking data has been cleared.");
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <p>API keys, integration, privacy controls, etc.</p>
      <button onClick={handleClearData}>Clear All Tracking Data</button>
    </div>
  );
}