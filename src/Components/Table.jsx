import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const Table = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );

        const data = await response.json();
        const formattedRows = data.map((coin) => ({
          id: coin.id,
          symbol: coin.symbol,
          img: coin.image,
          name: coin.name,
          change24h: coin.price_change_percentage_24h,
          price: coin.current_price,
        }));
        setRows(formattedRows);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowClick = (id) => {
    navigate(`/coin/${id}`);
  };

  return (
    <div id="table" className="container mx-auto p-4 bg-black text-white">
      <h1 className="text-center py-3 mb-8 text-4xl font-bold tracking-tight text-yellow-500 sm:text-6xl">
        Find your favorite cryptocurrency
      </h1>

      <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-5">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.field}
                        className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      >
                        {col.headerName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row) => (
                    <tr
                      key={row.id}
                      className="cursor-pointer hover:bg-gray-700  transition duration-200 ease-in-out"
                      onClick={() => handleRowClick(row.id)}
                    >
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                        <div className="flex items-center">
                          <img
                            src={row.img}
                            alt={row.name}
                            className="w-6 h-6 inline-block mr-2"
                          />
                          {row.symbol.toUpperCase()}
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                        {row.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                        <span
                          className={
                            row.change24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {row.change24h.toFixed(2)}%
                        </span>{" "}
                      </td>
                      <td className="border-t-0 text-yellow-500 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                        ₹{row.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <nav>
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                className={`px-3 py-2 border border-gray-300 ${
                  currentPage === 1
                    ? "bg-gray-300 text-green-800"
                    : "bg-white text-green-800"
                }`}
                disabled={currentPage === 1}
              >
                &lt; Prev
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredRows.length / itemsPerPage)
                    )
                  )
                }
                className={`px-3 py-2 border border-gray-300 ${
                  currentPage === Math.ceil(filteredRows.length / itemsPerPage)
                    ? "bg-gray-300 text-green-800"
                    : "bg-white text-green-800"
                }`}
                disabled={
                  currentPage === Math.ceil(filteredRows.length / itemsPerPage)
                }
              >
                Next &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
