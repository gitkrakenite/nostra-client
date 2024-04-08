import React, { useEffect, useRef, useState } from "react";
import Hello from "../assets/hello.png";
import { FiRefreshCcw } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import axios from "../axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import Receive from "../assets/receiv.gif";
import Package from "../assets/pack.png";
import Delivered from "../assets/deliv.gif";
import Shipping from "../assets/ship1.gif";
import Reject from "../assets/reject.png";

const Progress = () => {
  const location = useLocation();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const dataFromPreviousPage = location?.state?.data;
    setUrl(dataFromPreviousPage);
  }, []);

  const [currentOrder, setCurrentOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchOrderStatus = async () => {
    try {
      setLoading(true);
      let currentId = { id: url.orderId };
      let dataToSend = currentId.id;

      let token = user?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response = await axios.get("/orders/" + dataToSend, config);
      if (response) {
        setLoading(false);
        setCurrentOrder(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed To Check Progress");
    }
  };

  const textRef = useRef(null);

  const handleCopy = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      // You can also display a success message or perform any other action after copying.
      toast.success("Copied To Clipboard", { theme: "dark" });
    }
  };

  const getCurrentTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-[1em]">
      {loading ? (
        <div className="h-[85vh] w-full flex justify-center items-center">
          <Spinner message="Loading Status" />
        </div>
      ) : (
        <>
          {/* wrapper */}
          <div>
            <Link to="/home">
              <AiOutlineArrowLeft className="text-2xl" />
            </Link>

            <div className="my-[1em]">
              <p className="text-zinc-500 font-semibold text-lg">
                {getCurrentTime()} {user?.username}
              </p>
              <div className="my-[6px]">
                <p className="mb-[15px]">Please Click To refresh status</p>
                <div
                  className="flex gap-8 items-center cursor-pointer"
                  onClick={handleFetchOrderStatus}
                >
                  <div>
                    {!loading && (
                      <FiRefreshCcw className="text-2xl cursor-pointer text-pink-500" />
                    )}
                  </div>

                  <p className="text-pink-600">
                    {currentOrder.progress || "received"}
                  </p>
                </div>
              </div>
            </div>

            {/* show status */}

            <div>
              <div className="flex justify-center mb-[1em]">
                <div>
                  {currentOrder.progress === "received" && (
                    <img src={Receive} alt="receive" />
                  )}
                  {currentOrder.progress === "packaging" && (
                    <img src={Package} alt="packing" />
                  )}
                  {currentOrder.progress === "shipping" && (
                    <img src={Shipping} alt="shipping" />
                  )}
                  {currentOrder.progress === "delivered" && (
                    <img
                      src={Delivered}
                      alt="delivered"
                      className="max-h-[420px]"
                    />
                  )}
                  {currentOrder.progress === "rejected" && (
                    <img
                      src={Reject}
                      alt="rejected"
                      className="max-h-[420px]"
                    />
                  )}
                </div>
              </div>

              {/* received */}
              {currentOrder.progress === "received" && (
                <div className="flex-[0.25]">
                  <div className="flex items-center">
                    <div className="w-full h-[5px] bg-pink-500" />
                    <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                  </div>
                  <div className="text-center">
                    <p>Received</p>
                  </div>
                </div>
              )}

              {currentOrder.progress === "packaging" && (
                <div className="flex">
                  {/* received */}
                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Received</p>
                    </div>
                  </div>
                  {/* packaging */}
                  <div
                    className={`flex-[0.25]  ${
                      currentOrder.progress === "packaging"
                        ? "visible"
                        : "hidden"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Packaging</p>
                    </div>
                  </div>
                </div>
              )}

              {currentOrder.progress === "shipping" && (
                <div className="flex">
                  {/* received */}

                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Received</p>
                    </div>
                  </div>
                  {/* packaging */}

                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Packaging</p>
                    </div>
                  </div>
                  {/* shipping */}
                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Shipping</p>
                    </div>
                  </div>
                </div>
              )}

              {currentOrder.progress === "delivered" && (
                <div className="flex">
                  {/* received */}
                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Received</p>
                    </div>
                  </div>
                  {/* packaging */}
                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Packaging</p>
                    </div>
                  </div>
                  {/* shipping */}
                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Shipping</p>
                    </div>
                  </div>
                  {/* delivered */}
                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Delivered</p>
                    </div>
                  </div>
                </div>
              )}
              {currentOrder.progress === "rejected" && (
                <div className="flex">
                  {/* received */}
                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-pink-500" />
                      <div className="w-[20px] h-[20px] bg-pink-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Received</p>
                    </div>
                  </div>

                  {/* rejected */}
                  <div className="flex-[0.25]">
                    <div className="flex items-center">
                      <div className="w-full h-[5px] bg-red-500" />
                      <div className="w-[20px] h-[20px] bg-red-500 rounded-full" />
                    </div>
                    <div className="text-center">
                      <p>Rejected</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                {currentOrder._id && (
                  <>
                    <div className=" mt-[1em]">
                      <p className="text-center mb-1">
                        To be delivered at {currentOrder.location}
                      </p>
                      <p className="text-center">
                        We will call you at {currentOrder.newPhone}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/*  */}
            <div className="mt-[20px]">
              <h2 className="text-center font-bold mb-8">
                Payment Via Till Number
              </h2>

              <div
                className="flex items-center justify-center cursor-pointer "
                onClick={handleCopy}
              >
                <input
                  type="text"
                  ref={textRef}
                  value={`0798556471`}
                  readOnly
                  className="bg-transparent outline-none text-pink-600"
                />
                <button>
                  <MdOutlineContentCopy
                    className="text-3xl text-pink-500"
                    title="Click To Copy"
                  />
                </button>
              </div>
            </div>
            {/*  */}
          </div>
        </>
      )}
    </div>
  );
};

export default Progress;
