import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
  return (
    <Container fluid className="py-3 text-center footer">
      <Row className="justify-content-center align-items-center">
        <Col xs="auto">
          <span>Copyright &#169; 2023 All Rights Reserved. Made by <span style={{ color: '#2b752b' }}>Priyanshu</span></span>
        </Col>
        <Col xs="auto">
          <span className="mr-2">Follow me : </span>
          <a href="https://twitter.com/Priyans72532451" className="mr-2"><FaTwitter /></a>
          <a href="https://www.instagram.com/__priyanshu.sharma/" className="mr-2"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/priyanshu-sharma-025737216/"><FaLinkedin /></a>
          <a href="https://www.facebook.com/profile.php?id=100069703429860&mibextid=ZbWKwL"><FaFacebook /></a>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer;
