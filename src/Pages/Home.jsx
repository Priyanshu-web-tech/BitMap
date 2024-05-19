import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import Carousel from "../Components/Carousel ";
import Table from "../Components/Table";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Hero />
        <Carousel />
      </div>
      <Table />
    </>
  );
};

export default Home;
