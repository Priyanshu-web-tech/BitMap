import React from 'react';
import './Banner.css';
import { motion } from 'framer-motion';

const Banner = () => {
  const bannerVariants = {
    initial: {
      opacity: 0,
      y: -50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className='banner-bg'
      variants={bannerVariants}
      initial='initial'
      animate='animate'
    >
      <motion.div className='banner-content'>
        <motion.h1 variants={textVariants}>Welcome to the world of cryptocurrency</motion.h1>
        <motion.p variants={textVariants}>
          Invest in digital assets and explore decentralized finance (DeFi)
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
