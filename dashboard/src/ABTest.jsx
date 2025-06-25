// new proj/dashboard/src/ABTest.jsx
import React, { useState, useEffect } from "react";

const AB_TEST_KEY = "ab_test_status";

export default function ABTest() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem(AB_TEST_KEY));
    if (status) {
      setIsActive(status.isActive);
    }
  }, []);

  const toggleTest = () => {
    const newStatus = !isActive;
    setIsActive(newStatus);
    localStorage.setItem(AB_TEST_KEY, JSON.stringify({ isActive: newStatus }));
    alert(`A/B Test is now ${newStatus ? 'ACTIVE' : 'INACTIVE'}. Reload the demo page to apply the change.`);
  };

  return (
    <div>
      <h2>A/B Testing</h2>
      <p>Enable or disable personalization to compare results.</p>
      <p>Current Status: <strong>{isActive ? "Active" : "Inactive"}</strong></p>
      <button onClick={toggleTest}>
        {isActive ? "Stop A/B Test" : "Start A/B Test"}
      </button>
    </div>
  );
}