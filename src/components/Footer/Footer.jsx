import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { motion } from "framer-motion";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <Container fluid className="py-3 text-center footer">
      <Row className="justify-content-center align-items-center">
        <Col xs="auto">
          <span>
            Copyright &#169; 2023 All Rights Reserved. Made by{" "}
            <span>
              <a
                style={{ color: "#2b752b", textDecoration: "None" }}
                href="https://priyanshu-sharma-portfolio.netlify.app/"
              >
                Priyanshu
              </a>
            </span>
          </span>
        </Col>
        <Col xs="auto d-flex">
          <span className="mr-2">Follow me : </span>
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100069703429860&mibextid=ZbWKwL"
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <AiFillFacebook size={30} />
            </motion.div>
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/__priyanshu.sharma/"
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <AiFillInstagram size={30} />
            </motion.div>
          </a>
          <a target="_blank" href="https://twitter.com/Priyans72532451">
            <motion.div whileHover={{ scale: 1.2 }}>
              <AiFillTwitterSquare size={30} />
            </motion.div>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/priyanshu-sharma-025737216/"
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <AiFillLinkedin size={30} />
            </motion.div>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
