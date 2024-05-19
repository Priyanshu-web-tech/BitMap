import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useParams } from "react-router-dom";

const CoinChart = () => {
  const { id } = useParams();
  const [historicData, setHistoricData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to store the chart instance
  const [selectedOption, setSelectedOption] = useState("24hour"); // State to store the selected time range option

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true when fetching data

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=${getDays(
            selectedOption
          )}`
        );
        const data = await response.json();
        setHistoricData(data.prices);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };
    fetchData();
  }, [id, selectedOption]);

  useEffect(() => {
    // Build the Line Chart using Chart.js
    if (historicData && historicData.length > 0 && chartRef.current) {
      // Destroy the previous chart instance before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const chartCtx = chartRef.current.getContext("2d");

      // Prepare data for the chart
      const labels = historicData.map((item) =>
        new Date(item[0]).toLocaleDateString()
      );
      const prices = historicData.map((item) => item[1]);

      // Create the chart
      const chartInstance = new Chart(chartCtx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Price (INR)",
              data: prices,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "gold",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      // Store the chart instance in the ref
      chartInstanceRef.current = chartInstance;
    }
  }, [historicData]);

  // Function to get the number of days based on the selected time range option
  const getDays = (option) => {
    switch (option) {
      case "24hour":
        return 1;
      case "30days":
        return 30;
      case "1year":
      default:
        return 365;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center mb-5">Historical Price Chart</h2>
      {loading ? ( // Show loading indicator if loading is true
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <div className="flex justify-center">
            <div className="w-full md:w-10/12 lg:w-8/12">
              <canvas ref={chartRef} width="800" height="400" />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className={`m-2 px-4 py-2 border rounded ${
                selectedOption === "24hour"
                  ? "bg-green-500 text-white"
                  : "bg-white border-green-500 text-green-500"
              }`}
              onClick={() => setSelectedOption("24hour")}
            >
              24 Hours
            </button>
            <button
              className={`m-2 px-4 py-2 border rounded ${
                selectedOption === "30days"
                  ? "bg-green-500 text-white"
                  : "bg-white border-green-500 text-green-500"
              }`}
              onClick={() => setSelectedOption("30days")}
            >
              30 Days
            </button>
            <button
              className={`m-2 px-4 py-2 border rounded ${
                selectedOption === "1year"
                  ? "bg-green-500 text-white"
                  : "bg-white border-green-500 text-green-500"
              }`}
              onClick={() => setSelectedOption("1year")}
            >
              1 Year
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinChart;
