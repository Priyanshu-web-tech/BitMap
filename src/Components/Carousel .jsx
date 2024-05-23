import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { motion } from "framer-motion";
import "react-alice-carousel/lib/alice-carousel.css";

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
      items: 3,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="bg-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-3 mb-8 text-2xl font-bold tracking-tight  sm:text-4xl text-yellow-500"
      >
        Trending Cryptocurrencies
      </motion.h1>
      <div>
        {coinData.length === 0 ? (
          <p className="text-center">Loading...</p>
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
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center flex-col"
                key={coin.id}
              >
                <img src={coin.image} width={50} alt={coin.name} />
                <p>{coin.name}</p>
                <p>₹{coin.current_price}</p>
              </motion.div>
            ))}
          />
        )}
      </div>
    </div>
  );
};

export default Carousel;
