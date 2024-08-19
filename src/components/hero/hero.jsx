import React, { useState } from "react";
import axios from "axios";
import { userContexthook } from "../../context/userContext";
import { featureData } from "../../data";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser, setToken } = userContexthook();
  const loginDefaultData = {
    mobile: "+919098989999",
    otp: "8899",
  };
  const handleUSerLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/auth/verifyotp`,
        loginDefaultData
      );
      if (response.status === 200) {
        setAuthUser(response.data.user);
        setToken(response.data.token);
        navigate("/home");
      } else {
        const error = new Error("something went wrong !");
        throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex">
      <div className="flex justify-center items-center">
        <div className="bg-[#051937] p-4 m-2 rounded-lg max-sm:rounded-sm text-white space-y-10 lg:h-[98dvh]">
          <Navbar/>
          <div className="grid grid-cols-2 grid-rows-1 items-center justify-center max-md:grid-cols-1 md:w-[80%] m-auto">
            <div className="first-letter:uppercase p-3 space-y-5 self-center flex flex-col max-md:items-center">
              <h1 className="lg:text-[2.5rem] max-lg:text-[1.5rem] max-md:text-center tracking-widest uppercase font-bold">
                Instant <span className="text-[#A8EB12]">payment</span> with
                others providers
              </h1>
              <p className="tracking-widest max-md:text-center font-bold ">
                Experience the ease of instant payments with our streamlined
                solutions. Fast, secure, and hassle-free transactions at your
                fingertips
              </p>
              <div className="py-5 px-3 w-fit">
                <form
                  action=""
                  className="flex flex-col gap-5 "
                  onSubmit={handleUSerLogin}
                >
                  {loading ? (
                    <>
                      <div className="text-white justify-center font-semibold rounded-3xl px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-base md:px-6 md:py-3.5 md:text-md lg:px-7 lg:py-4 lg:text-xl flex gap-3">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 text-black animate-spin dark:white fill-[#A8EB12] items-center"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#A8EB12] items-center text-[#051937] font-semibold rounded-3xl px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-base md:px-6 md:py-3.5 md:text-md lg:px-7 lg:py-4 lg:text-xl flex gap-3"
                    >
                      <span className="">login</span>
                      <FaArrowRightToBracket />
                    </button>
                  )}
                </form>
              </div>
              <div className="flex gap-4 flex-col lg:flex-row max-sm:gap-1"></div>
            </div>
            <div className="justify-self-center">
              <div>
                <img src="/images/freepik.png" alt="" className="w-[400px]" />
              </div>
            </div>
          </div>
          <div className="lg:flex gap-5 justify-center max-md:flex-col max-md:text-[0.7rem] text-[.9rem] grid max-lg:grid-cols-2 max-lg:grid-rows-2 max-lg:gap-4 max-sm:grid-cols-1 grid-cols-4 w-[80%] m-auto space-y-4">
            {featureData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="w-[200px] m-auto flex flex-col items-center p-4 justify-center  rounded-lg max-sm:rounded-sm bg-[#A8EB12]"
                >
                  <img
                    src={data.src}
                    alt=""
                    className="w-20 h-20 bg-transparent"
                  />
                  <p className="max-md:w-full rounded-lg p-2 flex text-balance justify-center items-center text-black font-bold">
                    {data.heading}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
