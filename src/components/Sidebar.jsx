import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const currentPath = useLocation().pathname;
  return (
    <div className="w-[18%] min-h-[100vh] border border-[#a9a9a9] border-t-0 border-b-0 text-[max(1vw,10px)]  ">
      <div className="pt-12 pl-[20%] flex flex-col gap-5">
        <NavLink
          to="/add"
          className={
            currentPath === "/add"
              ? "border-[#e63718e9] text-white flex items-center gap-5 border bg-[#fff0ed] border-r-0 py-2 px-2.5  rounded rounded-r-[0] cursor-pointer"
              : "flex items-center gap-5 border border-[#a9a9a9] border-r-0 py-2 px-2.5  rounded rounded-r-[0] cursor-pointer"
          }
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden sm:block">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={
            currentPath === "/list"
              ? "border-[#e63718e9] text-white flex items-center gap-5 border bg-[#fff0ed] border-r-0 py-2 px-2.5  rounded rounded-r-[0] cursor-pointer"
              : "flex items-center gap-5 border border-[#a9a9a9] border-r-0 py-2 px-2.5  rounded rounded-r-[0] cursor-pointer"
          }
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:block">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={
            currentPath === "/orders"
              ? "border-[#e63718e9] text-white flex items-center gap-5 border bg-[#fff0ed] border-r-0 py-2 px-2.5  rounded rounded-r-[0] cursor-pointer"
              : "flex items-center gap-5 border border-[#a9a9a9] border-r-0 py-2 px-2.5  rounded rounded-r-[0] cursor-pointer"
          }
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:block">Orders</p>
        </NavLink>

        <NavLink
          to="/promos"
          className={
            currentPath === "/promos"
              ? "border-[#e63718e9] text-white flex items-center gap-5 border bg-[#fff0ed] border-r-0 py-2 px-2.5 rounded rounded-r-[0] cursor-pointer"
              : "flex items-center gap-5 border border-[#a9a9a9] border-r-0 py-2 px-2.5 rounded rounded-r-[0] cursor-pointer"
          }
        >
          <img src={assets.add_icon} alt="" />
          {/* baad me change krna h promo incone se  */}
          <p className="hidden sm:block">Promo Codes</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
