import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function getBehaviorData() {
  let data = [];
  try {
    data = JSON.parse(localStorage.getItem("user_behavior_data")) || [];
  } catch {
    data = [];
  }
  return data;
}

function processAnalytics(data) {
  let clickCounts = { sports: 0, politics: 0, tech: 0, other: 0 };
  data.forEach(ev => {
    if (ev.type === "click" && ev.elementData?.cluster) {
      clickCounts[ev.elementData.cluster]++;
    }
  });
  return clickCounts;
}

export default function Analytics() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(getBehaviorData());
    window.addEventListener("storage", () => setData(getBehaviorData()));
  }, []);

  const clickCounts = processAnalytics(data);

  const chartData = {
    labels: Object.keys(clickCounts),
    datasets: [
      {
        label: "Clicks per Section",
        data: Object.values(clickCounts),
        backgroundColor: ["#FFD700", "#4682B4", "#8FBC8F", "#D2691E"]
      }
    ]
  };

  return (
    <div>
      <h2>Analytics</h2>
      <Bar data={chartData} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}