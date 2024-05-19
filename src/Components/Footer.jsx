import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-6 md:py-12 bg-black text-white">
      <div className="flex flex-col items-center justify-center md:flex-row">
        <p className="text-center mb-4 md:mb-0 md:mr-4">
          Copyright © 2024 All Rights Reserved. Made by{" "}
          <span className="text-yellow-500">Priyanshu</span> | Follow me:
        </p>

        <div className="flex justify-center">
          <a
            target="_blank"
            href="https://github.com/Priyanshu-web-tech"
            className="ml-2"
          >
            <FaGithub size={25} />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/priyanshu-sharma-025737216/"
            className="ml-2"
          >
            <FaLinkedin size={25} />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/__priyanshu.sharma/  "
            className="ml-2"
          >
            <FaInstagram size={25} />
          </a>
          <a
            target="_blank"
            href="https://twitter.com/Priyans72532451"
            className="ml-2"
          >
            <FaTwitter size={25} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
