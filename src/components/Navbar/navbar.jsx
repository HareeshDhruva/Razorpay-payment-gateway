import React from "react";
import { RiMenu3Fill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="md:w-[80%] m-auto flex items-center justify-between ">
      <div>
        <img src="/images/logo.png" alt="" className="w-[50px]" />
      </div>
      <div>
        <RiMenu3Fill className="sm:text-base md:text-md lg:text-2xl text-[#A8EB12] font-bold" />
      </div>
    </div>
  );
};
export default Navbar;
