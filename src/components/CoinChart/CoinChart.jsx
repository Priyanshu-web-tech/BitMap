import React, { useState, useEffect, useRef } from "react";
import {Chart} from "chart.js/auto";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const CoinChart = () => {
  const { id } = useParams();
  const [historicData, setHistoricData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to store the chart instance
  const [selectedOption, setSelectedOption] = useState("24hour"); // State to store the selected time range option

  useEffect(() => {
    // Fetch historical cryptocurrency price data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v3/coins/${id}/market_chart?vs_currency=INR&days=${getDays(
            selectedOption
          )}`
        );
        const data = await response.json();
        setHistoricData(data.prices);
      } catch (error) {
        console.error("Error fetching coin data:", error);
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
    <Container>
      <h2 className="text-center mb-5">Historical Price Chart</h2>
      <Col>
        <div>
          <canvas ref={chartRef} width="800" height="400" />
        </div>
      </Col>
      <Row className="mt-2 ">
        <Col>
          <div className="d-flex justify-content-center align-center">
            <Button
              variant="outline-success"
              onClick={() => setSelectedOption("24hour")}
              active={selectedOption === "24hour"}
              className="m-2"
            >
              24 Hours
            </Button>
            <Button
              variant="outline-success"
              onClick={() => setSelectedOption("30days")}
              active={selectedOption === "30days"}
              className="m-2"
            >
              30 Days
            </Button>
            <Button
              variant="outline-success"
              onClick={() => setSelectedOption("1year")}
              active={selectedOption === "1year"}
              className="m-2"
            >
              1 Year
            </Button>
          </div>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default CoinChart;
