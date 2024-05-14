import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import CoinChart from "../CoinChart/CoinChart";

const Info = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    fetch(`/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => setCoinData(data))
      .catch((error) => console.error("Error fetching coin data:", error));
  }, [id]);

  if (!coinData) {
    return <div>Loading...</div>;
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
    <div>
      <br />
      <br />
      <br />
      <Container>
        <Row>
        <Col sm={7}>
            <CoinChart />
          </Col>
          <Col
            sm={5}
            className="text-center"
            style={{ borderLeft: "1px solid #ccc" }}
          >

<h1>{name}</h1>
            <img width={"30%"} src={image.large} alt={name} />
            
            <p>
              <strong>Rank:</strong> {market_cap_rank}
            </p>
            <p>
              <strong>Current Price:</strong> ₹{current_price.inr}
            </p>
            <p>
              <strong>Market Cap:</strong> ₹{formatNumber(market_cap.inr)}
            </p>
            <div
              style={{ color: "gold",fontSize:"22px" }}
              className="my-3"
              dangerouslySetInnerHTML={{
                __html: description.en.split(". ")[0],
              }}
            />
          </Col>
          
        </Row>
      </Container>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Info;
