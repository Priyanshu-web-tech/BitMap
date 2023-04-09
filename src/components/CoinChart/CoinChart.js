import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form } from 'react-bootstrap';

const CoinChart = () => {
  const { id } = useParams();

  const [historicData, setHistoricData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to store the chart instance
  const [selectedOption, setSelectedOption] = useState('1year'); // State to store the selected time range option

  useEffect(() => {
    // Fetch historical cryptocurrency price data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=${getDays(selectedOption)}`
        );
        const data = await response.json();
        setHistoricData(data.prices);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };
    fetchData();
  }, [selectedOption]);

  useEffect(() => {
    // Build the Line Chart using Chart.js
    if (historicData && historicData.length > 0 && chartRef.current) {
      // Destroy the previous chart instance before creating a new one
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const chartCtx = chartRef.current.getContext('2d');

      // Prepare data for the chart
      const labels = historicData.map((item) =>
        new Date(item[0]).toLocaleDateString()
      );
      const prices = historicData.map((item) => item[1]);

      // Create the chart
      const chartInstance = new Chart(chartCtx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Price (INR)',
              data: prices,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
    switch(option) {
      case '24hour':
        return 1;
      case '30days':
        return 30;
      case '1year':
      default:
        return 365;
    }
  }

  // Function to handle change in the time range option
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }
  return (
     <Container>
      <h2 className='text-center mb-5'>Historical Price Chart</h2>
      <Col>
          <div>
            <canvas ref={chartRef} width='800' height='400' />
          </div>
        </Col>
      <Row className='mt-2 '>
        <Col>
          <Form className='d-flex justify-content-center align-center'>
            <Form.Check
              type='radio'
              name='timeRange'
              value='24hour'
              checked={selectedOption === '24hour'}
              onChange={handleOptionChange}
              label='24 Hours'
              className='p-3'
            />
            <Form.Check
              type='radio'
              name='timeRange'
              value='30days'
              checked={selectedOption === '30days'}
              onChange={handleOptionChange}
              label='30 Days'
              className='p-3'
            />
            <Form.Check
              type='radio'
              name='timeRange'
              value='1year'
              checked={selectedOption === '1year'}
              onChange={handleOptionChange}
              label='1 Year'
              className='p-3'
            />
          </Form>
        </Col>
      </Row>
      <Row>
        
      </Row>
    </Container>
  );
}

export default CoinChart;
