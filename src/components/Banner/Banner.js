import React from 'react';
import { motion } from 'framer-motion';
import bg from '../../assets/bg.mp4';
import './Banner.css';
import { Container, Row, Col } from 'react-bootstrap';

const Banner = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideUp = {
    hidden: { y: 100 },
    visible: { y: 0 },
  };

  return (
    <Container fluid className="p-0">
      <motion.video
        src={bg}
        autoPlay
        loop
        muted
        playsInline
        className="banner-video"
      />
      <Container className="banner-overlay">
        <Row>
          <Col>
            <motion.h1
              style={{ marginTop: '2rem' }}
              className="text-center"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
            >
              Welcome to the World of Cryptocurrency
            </motion.h1>
            <motion.p
              className="text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, delay: 0.5 }}
            >
              Invest in digital assets and explore decentralized finance (DeFi)
            </motion.p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Banner;
