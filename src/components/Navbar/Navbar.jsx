import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const NavbarComponent = () => {
  return (

    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar variant="dark" >
        <Container>
          <Navbar.Brand style={{ padding: "1rem", fontSize: "40px" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <motion.h1
                style={{
                  color: "#2b752b",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                BitMap
              </motion.h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <motion.span
                style={{
                  fontSize: "20px",
                  color: "#f0c940",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Exploring the CryptoVerse
              </motion.span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.nav>

  );
};

export default NavbarComponent;
