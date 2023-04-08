import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components

const Carousel = () => {
  const [coinData, setCoinData] = useState([]);
  const [lastFetchedTime, setLastFetchedTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data was fetched within last 10 minutes
        const currentTime = new Date().getTime();
        if (!lastFetchedTime || currentTime - lastFetchedTime > 600000) {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
          );
          const data = await response.json();
          setCoinData(data);
          setLastFetchedTime(currentTime); // Update last fetched time
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [lastFetchedTime]); // Fetch data only when lastFetchedTime changes

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={10} lg={8} xl={8}>
          <div className="slider">
            {coinData.length === 0 ? (
              // Display loading message or spinner while data is being fetched
              <p>Loading...</p>
            ) : (
              // Render fetched data
              <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={coinData.map((coin) => (
                  <div key={coin.id}>
                    <img src={coin.image} width={40} alt="" />
                    <p>{coin.name}</p>
                    <p>₹{coin.current_price}</p>
                  </div>
                ))}
                autoPlay
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Carousel;
