import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white py-6">
      <div className="flex flex-col items-center justify-between mx-4 md:flex-row md:mx-36">
        <Link to={"/"}>
          <span className="font-bold text-3xl md:text-5xl text-green-600">BitMap</span>
        </Link>
        <span className="font-bold text-2xl text-yellow-500 md:hidden">Exploring the Cryptoverse</span>
        <span className="hidden md:block font-bold text-2xl text-yellow-500">Exploring the Cryptoverse</span>
      </div>
    </div>
  );
};

export default Navbar;
