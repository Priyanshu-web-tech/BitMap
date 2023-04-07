import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import Navbar from "../../components/Navbar/Navbar"
import Banner from '../../components/Banner/Banner'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Carousel/> 
    </div>
  )
}

export default Home
