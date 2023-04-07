import React from 'react';
import bg from '../../assets/bg.mp4';
import './Banner.css';

const Banner = () => {
  return (
    <div className='container'>
      <video className='video' src={bg} autoPlay loop muted playsInline />
    </div>
  );
};

export default Banner;
