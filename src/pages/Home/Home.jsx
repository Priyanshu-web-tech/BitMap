import React, { useState, useEffect } from "react";
import Carousel from '../../components/Carousel/Carousel'
import Navbar from "../../components/Navbar/Navbar"
import Banner from '../../components/Banner/Banner'
import CoinTable from '../../components/CoinTable/CoinTable'
import Footer from '../../components/Footer/Footer';
import { Triangle} from 'react-loader-spinner';
import "./Home.css";

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
    {isLoading ? (
      <div className="loading-container">
        <Triangle height={100} width={100} color={"#2b752b"} ariaLabel={"Loading"} className="loading-container"/>
      </div>
    ) : (
      <div>
        <Navbar/>
      <Banner/>
       <Carousel/>
      <CoinTable/>
      <Footer/>
      </div>
    )}
  </div>
  )
}

export default Home


