import React from "react";
import { userContexthook } from "../../context/userContext";
import { TbLogout2 } from "react-icons/tb";
import Card from "../card/card";
import { itemList } from "../../data";
import { FaPhone } from "react-icons/fa6";
import {useNavigate } from "react-router-dom";

const Home = () => {
  const { authUser, token } = userContexthook();
  const navigate = useNavigate();
  const logout = () =>{
    if(token && authUser){
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <div className="grid grid-cols-4 max-md:grid-cols-1 h-[100dvh] w-full">
      <div className="flex justify-center items-center flex-col gap-5 bg-[#051937] text-white py-4 max-sm:p-2">
        {authUser && (
          <div className="w-full max-sm:text-center">
            <div>
              <p className="uppercase text-center">User Details</p>
            </div>
            <div className="flex flex-col items-center p-4 gap-4 max-sm:gap-2">
              <img
                src={authUser.profilePic}
                alt="profilePic"
                className="rounded-full h-[200px] w-[200px] max-sm:h-[100px] max-sm:w-[100px] ring-4 p-1 ring-[#A8EB12]"
              />
              <div className="flex gap-6 p-2 items-center justify-center max-sm:flex-col max-sm:gap-2 max-sm:text-sm">
                <p className="flex gap-2 items-center justify-center">
                  <FaPhone /> <span>Mobile</span>
                </p>
                <p>{authUser.mobile}</p>
              </div>
            </div>
            <div className="flex text-[.8rem] justify-between p-10">
              <button
                type="submit"
                className="rounded-full p-2 w-full bg-[#A8EB12] text-[#051937] items-center justify-center  font-semibold px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-base md:px-6 md:py-3.5 md:text-md lg:px-7 lg:py-4 lg:text-xl flex gap-3"
                onClick={logout}
              >
                <span>
                  <TbLogout2 />
                </span>
                logout
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-3 max-sm:col-span-1 py-10">
        <Card itemList={itemList} />
      </div>
    </div>
  );
};

export default Home;
