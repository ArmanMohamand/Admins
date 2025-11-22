import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-2 px-[5%] ">
      <Link to="/">
        <h1 className="text-[#bfb5b3e9] text-4xl lg:text-5xl font-semibold">
          FitZilla
        </h1>
      </Link>
      <img className="w-10 rounded-[25%]" src={assets.Arman} alt="" />
    </div>
  );
};

export default Navbar;
