import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="bg-black text-white py-6">
      <div className="flex flex-col items-center justify-between mx-4 md:flex-row md:mx-36">
        <Link to={"/"}>
          <motion.span
            className="font-bold text-3xl md:text-5xl text-green-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            BitMap
          </motion.span>
        </Link>
        <motion.span
          className="font-bold text-2xl text-yellow-500 md:hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Exploring the Cryptoverse
        </motion.span>
        <motion.span
          className="hidden md:block font-bold text-2xl text-yellow-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Exploring the Cryptoverse
        </motion.span>
      </div>
    </div>
  );
};

export default Navbar;
