import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";

const Carousel = () => {
  const [coinData, setCoinData] = useState([]);
  const [lastFetchedTime, setLastFetchedTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTime = new Date().getTime();
        if (!lastFetchedTime || currentTime - lastFetchedTime > 600000) {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
          );
          const data = await response.json();
          setCoinData(data);
          setLastFetchedTime(currentTime);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [lastFetchedTime]);

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="cara">
      <h1>Trending Cryptocurrencies.</h1>
      <div className="slider">
        {coinData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            autoPlay
            responsive={responsive}
            items={coinData.map((coin) => (
              <div key={coin.id}>
                <img src={coin.image} width={50} alt="" />
                <p>{coin.name}</p>
                <p>₹{coin.current_price}</p>
              </div>
            ))}
          />
        )}
      </div>
    </div>
  );
};

export default Carousel;
