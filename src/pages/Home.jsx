import React from "react";
import Carousel from "../components/Carousel/Carousel";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import CoinTable from "../components/CoinTable/CoinTable";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
        <Navbar />
        <Banner />
        <Carousel />
        <CoinTable />
        <Footer />
    </>
  );
};

export default Home;
