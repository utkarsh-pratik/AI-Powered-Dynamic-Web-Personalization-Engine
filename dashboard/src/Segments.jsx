// new proj/dashboard/src/Segments.jsx
import React, { useState, useEffect } from "react";

// Logic from the engine to determine the primary cluster
function extractFeatures(events, clusterLabels) {
  let counts = {};
  clusterLabels.forEach(label => counts[label] = 0);
  events.forEach(ev => {
    if (ev.type === 'click' && ev.elementData?.cluster) {
      counts[ev.elementData.cluster]++;
    }
  });
  return Object.values(counts);
}

function predictCluster(features, clusterLabels) {
  if (features.length === 0 || Math.max(...features) === 0) {
    return "None";
  }
  let maxIdx = features.indexOf(Math.max(...features));
  return clusterLabels[maxIdx];
}

export default function Segments() {
  const [dominantSegment, setDominantSegment] = useState("None");
  // This should be dynamic in a real app, but we'll hardcode for now.
  const clusterLabels = ['sports', 'politics', 'tech', 'other'];

  const calculateSegment = () => {
    const data = JSON.parse(localStorage.getItem("user_behavior_data")) || [];
    const features = extractFeatures(data, clusterLabels);
    const segment = predictCluster(features, clusterLabels);
    setDominantSegment(segment);
  };

  useEffect(() => {
    calculateSegment();
    window.addEventListener("storage", calculateSegment);
    return () => window.removeEventListener("storage", calculateSegment);
  }, []);

  return (
    <div>
      <h2>User Segments</h2>
      <p>The dominant user segment based on tracked behavior.</p>
      <p>
        <strong>Current User Segment: {dominantSegment}</strong>
      </p>
    </div>
  );
}