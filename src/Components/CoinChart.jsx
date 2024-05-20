import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useParams } from "react-router-dom";

const CoinChart = () => {
  const { id } = useParams();
  const [allData, setAllData] = useState({
    "24hour": [],
    "30days": [],
    "1year": [],
  });
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("24hour");

  useEffect(() => {
    const fetchData = async (days) => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=${days}`
        );
        const data = await response.json();
        return data.prices;
      } catch (error) {
        console.error("Error fetching coin data:", error);
        return [];
      }
    };

    const loadAllData = async () => {
      setLoading(true);
      const [data24Hour, data30Days, data1Year] = await Promise.all([
        fetchData(1),
        fetchData(30),
        fetchData(365),
      ]);

      setAllData({
        "24hour": data24Hour,
        "30days": data30Days,
        "1year": data1Year,
      });
      setLoading(false);
    };

    loadAllData();
  }, [id]);

  useEffect(() => {
    if (
      allData[selectedOption] &&
      allData[selectedOption].length > 0 &&
      chartRef.current
    ) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const chartCtx = chartRef.current.getContext("2d");
      const labels = allData[selectedOption].map((item) =>
        new Date(item[0]).toLocaleDateString()
      );
      const prices = allData[selectedOption].map((item) => item[1]);

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

      chartInstanceRef.current = chartInstance;
    }
  }, [allData, selectedOption]);

  return (
    <div className="w-full md:w-7/12">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-5">Historical Price Chart</h2>
        {loading ? (
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
    </div>
  );
};

export default CoinChart;
