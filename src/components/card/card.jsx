import axios from "axios";
import { VscStarFull } from "react-icons/vsc";
import { loadRazorpayScript } from "../../utils/api";
import { userContexthook } from "../../context/userContext";
import { useEffect, useState } from "react";

const Card = ({ itemList }) => {
  const [rezorpay_key, setRezorpay_key] = useState();
  const { token } = userContexthook();
  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/payment/key`,{},{
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRezorpay_key(response.data.key);
      } catch (error) {
        console.error("Error fetching Razorpay key:", error);
      }
    };
    fetchRazorpayKey();
  }, [token]);

  const createOrder = async (value) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/order/create`,{
          packageId: "6613d6fbbf1afca9aa1b519e",
          pricingId: "662caa2d50bf43b5cef75232",
          finalAmount: value,
          couponCode: "NEET25",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      loadRazorpayScript();
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  const handlePayment = async (value) => {
    try{
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded || !rezorpay_key) {
        alert("Razorpay SDK failed to load or key is missing.");
        return;
      }
      const order = await createOrder(value);
      if (!order) return;
      const options = {
        key: rezorpay_key,
        amount: order.amount,
        currency: "INR",
        name: "TestBuddy",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
        },
        prefill: {
          name: "Devendra",
          email: "dev@example.com",
          contact: "9098989999",
        },
        theme: {
          color: "#F37254",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    catch(error){
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="w-full px-10 gap-6 grid grid-cols-2 max-sm:grid-cols-1 justify-center items-center h-[90dvh]">
    {itemList?.map((items, index) => (
      <div key={index}>
        {items?.name !== "" && (
          <div className="p-2 rounded-3xl shadow-lg hover:shadow-gray-500 ease-in duration-300 bg-[#051937] text-white font-bold">
            <img
              src={items.src}
              alt=""
              className="w-full h-[16rem] bg-cover inset-0 object-contain rounded-3xl"
            />
            <div className="p-2 space-y-1">
              <div className="flex justify-between">
                <p className="font-medium">{items.name}</p>
                <p className="bg-green-500 text-white px-1 text-[.8rem] rounded-md text-center flex justify-center items-center">
                  <VscStarFull className="text-white" />
                </p>
              </div>
              <div className="flex justify-between gap-5 overflow-hidden text-[.8rem]">
                <p>₹ {items.price}</p>
              </div>
              <div className="flex text-[.8rem] justify-between">
                <button
                  type="submit"
                  className="rounded-full p-2 w-full bg-[#A8EB12] text-[#051937]"
                  onClick={() => handlePayment(items.price)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
    <div className="p-4 md:hidden"></div>
  </div>  
  );
};
export default Card;
