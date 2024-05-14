import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CoinTable.css";
import { Link } from "react-router-dom";

const CoinTable = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [lastFetchedTime, setLastFetchedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTime = new Date().getTime();

        if (!lastFetchedTime || currentTime - lastFetchedTime > 600000) {
          const response = await fetch(
            "/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
          );

          const data = await response.json();
          const formattedRows = data.map((coin, index) => ({
            id: coin.id,
            symbol: coin.symbol,
            img: coin.image,
            name: coin.name,
            change24h: coin.price_change_percentage_24h,
            price: coin.current_price,
          }));
          setRows(formattedRows);
          setLastFetchedTime(currentTime);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lastFetchedTime]);

  const columns = [
    { field: "symbol", headerName: "Coin" },
    { field: "name", headerName: "Name" },
    { field: "change24h", headerName: "24h Change" },
    { field: "price", headerName: "Price" },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="table-responsive">
      <h1
        style={{ textAlign: "center", marginBottom: "2rem", color: "#f0c940" }}
      >
        CryptoCurrency Prices
      </h1>
      <div className="d-flex justify-content-center">
        <input
          style={{
            width: "80%",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px ",
            padding: "1rem",
          }}
          type="text"
          placeholder="Search For Your Coin"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="d-flex justify-content-center">
        <>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ width: "80%" }}
              className="table-sm mt-2"
            >
              <thead>
                <tr className="col-sm-3 text-center">
                  {columns.map((column) => (
                    <th
                      key={column.field}
                      style={{
                        border: "none",
                        backgroundColor: "#2b752b",
                        color: "white",
                      }}
                    >
                      {column.headerName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row) => (
                  <tr key={row.id}>
                    <td
                      className="col-sm-3 text-center"
                      style={{ border: "none", color: "#2b752b" }}
                    >
                      <Link to={`/coin/${row.id}`}>
                        <img src={row.img} alt={row.name} height="40" />
                      </Link>

                      <br />
                      <Link
                        to={`/coin/${row.id}`}
                        style={{
                          textDecoration: "none",
                          color: "#2b752b",
                          cursor: "pointer",
                          background: "transparent",
                        }}
                      >
                        View Details
                      </Link>
                    </td>
                    <td
                      className="col-sm-3 text-center"
                      style={{ border: "none" }}
                    >
                      {row.name}
                    </td>
                    <td
                      className="col-sm-3 text-center"
                      style={{
                        border: "none",
                        color: row.change24h < 0 ? "red" : "#2b752b",
                      }}
                    >
                      {row.change24h}%
                      {row.change24h < 0 ? <>&#9660;</> : <>&#9650;</>}
                    </td>
                    <td
                      className="col-sm-3 text-center"
                      style={{ border: "none" }}
                    >
                      ₹{row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      </div>

      <div className="d-flex justify-content-center ">
        <Pagination className="pagination-dark">
          {Array.from({ length: Math.ceil(rows.length / itemsPerPage) }).map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default CoinTable;
