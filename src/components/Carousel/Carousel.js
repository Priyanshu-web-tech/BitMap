import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";


const Carousel = () => {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="slider">
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
            <img src={coin.image} width={"50px"} alt="" />
            <span><p>{coin.name} ₹{coin.current_price}</p>
            </span>
            <p>{coin.price_change_percentage_24h}</p>
          </div>
        ))}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
