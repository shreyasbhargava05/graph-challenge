import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const App = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Simulating fetching JSON data (Replace with actual fetch request if needed)
    fetch("http://localhost:8000/api/python-chaalenge/1e0e7511-9e40-4b13-8c52-4f9c26c41c55") // Update with actual path
      .then((response) => response.json())
      .then((data) => {
        const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]

        // Extract energy usage before and after improvements
        const baselineEnergy = months.map((month) => data.results.baseline_energy_profile.monthly_energy_total[month].energy);
        const improvedEnergy = months.map((month) => data.results.improvement_plan[0].energy_profile.monthly_energy_total[month].energy);

        // Prepare chart data
        setChartData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Before Improvements",
              data: baselineEnergy,
              borderColor: "red",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 2,
              pointRadius: 5,
              tension: 0.4,
            },
            {
              label: "After Improvements",
              data: improvedEnergy,
              borderColor: "green",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              pointRadius: 5,
              tension: 0.4,
            },
          ],
        });
      });
  }, []);

  return (
    <div style={{ width: "800px", margin: "50px auto" }}>
      <h2>Monthly Energy Usage Comparison</h2>
      {chartData ? <Line data={chartData} options={{ responsive: true }} /> : <p>Loading...</p>}
    </div>
  );
};

export default App;
