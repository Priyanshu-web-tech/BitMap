import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Info = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true when fetching data

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator if loading is true
  }

  if (!coinData) {
    return <div>Error: Coin data not found.</div>;
  }

  const {
    name,
    image,
    description,
    market_cap_rank,
    market_data: { current_price, market_cap },
  } = coinData;

  // Function to format large numbers with K, M, B
  const formatNumber = (number) => {
    if (number > 999999999) {
      return (number / 1000000000).toFixed(2) + "B";
    } else if (number > 999999) {
      return (number / 1000000).toFixed(2) + "M";
    } else if (number > 999) {
      return (number / 1000).toFixed(2) + "K";
    }
    return number.toString();
  };
  return (
    <div className="w-full md:w-5/12 text-center border-gray-300">
      <h1 className="text-4xl font-bold mt-4">{name}</h1>
      <img
        className="mx-auto my-4"
        width={"30%"}
        src={image.large}
        alt={name}
      />
      <p className="text-xl">
        <strong>Rank:</strong> {market_cap_rank}
      </p>
      <p className="text-xl">
        <strong>Current Price:</strong> ₹{current_price.inr}
      </p>
      <p className="text-xl">
        <strong>Market Cap:</strong> ₹{formatNumber(market_cap.inr)}
      </p>
      <div
        className="my-3 text-yellow-500 text-2xl"
        dangerouslySetInnerHTML={{
          __html: description.en.split(". ")[0],
        }}
      />
    </div>
  );
};

export default Info;
