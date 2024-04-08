import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "../components/Spinner";
import { MdOutlinePhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdLocationCity } from "react-icons/md";

const CheckOut = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Please Sign in");
    }
  }, [user, navigate]);

  const [newPhone, setNewPhone] = useState("");
  const [location, setLocation] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [progress, setProgress] = useState("received");

  useEffect(() => {
    setNewPhone(user?.phone);
  }, [user]);

  // fetch products from cart
  // fetch products from localstorage
  const [cartProducts, setCartProducts] = useState([]);
  function getSortedProductsFromLocalStorage() {
    // Retrieve the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Sort the cart items in reverse order based on the timestamp or any other relevant property
    const sortedCartItems = cartItems.sort((a, b) => b.timestamp - a.timestamp);

    // Update the cart state with the sorted products
    setCartProducts(sortedCartItems);
    // console.log(sortedCartItems);
  }

  useEffect(() => {
    getSortedProductsFromLocalStorage();
  }, []);

  const [loading, setLoading] = useState(false);

  let deliveryFee = 0;

  function handleCalculateDelivery() {
    if (moreInfo === "nairobi") {
      deliveryFee = 5;
    } else if (moreInfo === "thika") {
      deliveryFee = 10;
    } else if (moreInfo === "kitengela") {
      deliveryFee = 15;
    } else {
      deliveryFee = 0;
    }
    return deliveryFee;
  }

  const handleCreateOrder = async (e) => {
    e.preventDefault();

    // username from saved user, phone number below, product details from cart and progress default = sent

    if (!user) {
      toast.error("Please Login To leave a like", { theme: "dark" });
      return;
    }

    let token = user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let username = user?.username;

    if (!username) {
      navigate("/login");
      return toast.error("You need an account to create order");
    }

    if (!newPhone || !location) {
      return toast.error("Phone number or location missing");
    }

    try {
      setLoading(true);
      const dataToSend = {
        username,
        newPhone,
        location,
        deliveryFee: handleCalculateDelivery(),
        moreInfo,
        progress,
        product: cartProducts,
      };

      console.log(dataToSend);

      const response = await axios.post("/orders/", dataToSend, config);
      if (response) {
        setLoading(false);
        toast.success("Order sent succesfully");
        // Clear the existing cart items
        localStorage.setItem("cart", JSON.stringify([]));
        let orderId = response.data._id;
        if (orderId) {
          navigate("/progress", { state: { data: { orderId } } });
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error creating order", { theme: "dark" });
    }
  };

  // working on modal

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // what happens when we click on a post
  const handlePostClick = () => {
    setIsPopUpOpen(true);
  };

  useEffect(() => {
    // handlePostClick();
  }, []);

  const PopUpPage = ({ onClose }) => {
    return (
      <div className="pop-up-page prompt">
        {/* data */}
        <div className="pop-up-content">
          <div className=" ">
            {/* share url */}
            <div>
              <p className="text-center mb-[10px]">
                <span className="text-2xl">😀</span>Welcome
              </p>
            </div>
            <h2 className="mb-[10px] text-center font-bold text-red-600">
              IMPORTANT ALERT
            </h2>
            <div className=" text-center">
              <p className="mb-[14px]">😢Due to Unavoidable circumstances</p>

              <p className="mb-[14px]">
                We Have Stopped Delivering Till Further Notice{" "}
              </p>

              <p>We hope we will get back to serving you soon</p>
            </div>
            {/*  */}
            <div className="mt-[1.6em] w-full flex justify-center">
              <button onClick={onClose} className="" id="roundedBg">
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em] xl:px-[5em] pt-[1em]">
        <div className="my-[20px]">
          <Link to="/cart">
            <AiOutlineArrowLeft className="text-2xl" />
          </Link>
        </div>

        <h2 className="text-lg font-bold mb-[1em]">Shipping Details</h2>

        <div className="flex w-full h-[58vh] justify-center items-center">
          <form className=" pt-[2em] w-[98%] sm:w-[80%]  md:w-[60%] xl:w-[50%]  2xl:w-[40%] m-auto">
            <div className="flex flex-col gap-[15px]">
              {/* user details */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phoneNumber"
                  className="text-lg font-semibold flex gap-3 items-center"
                >
                  <p>
                    <MdOutlinePhone className="text-pink-500" />
                  </p>
                  <p className="text-zinc-400"> Phone Number To Call</p>
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter phone number"
                  className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="delivery"
                  className="text-lg font-semibold flex gap-3 items-center"
                >
                  <p>
                    <CiLocationOn className="text-pink-500" />
                  </p>
                  <p className="text-zinc-400"> Delivery Location</p>
                </label>

                <select
                  name="delivery"
                  id="delivery"
                  value={moreInfo}
                  onChange={(e) => setMoreInfo(e.target.value)}
                  className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
                >
                  <option value="">Choose</option>
                  <option value="nairobi">Nairobi</option>
                  <option value="thika">Thika</option>
                  <option value="kitengela">Kitengela</option>
                </select>
              </div>
              {/* shipping details */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="moredelivery"
                  className="text-lg font-semibold flex gap-3 items-center"
                >
                  <p>
                    <MdLocationCity className="text-pink-500" />
                  </p>
                  <p className="text-zinc-400">
                    {" "}
                    Specify location in {moreInfo}
                  </p>
                </label>

                <textarea
                  name="moredelivery"
                  id="moredelivery"
                  cols="30"
                  rows="2"
                  placeholder="i.e Garden Estate House 49"
                  className="bg-transparent border border-zinc-500 rounded-md p-[8px]"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                ></textarea>
              </div>
              {/* Anymore details */}

              {loading ? (
                <div>
                  <Spinner message="creating order" />
                </div>
              ) : (
                <button
                  className="bg-pink-800 p-[10px] text-white rounded-md"
                  onClick={handleCreateOrder}
                >
                  Order Now
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {/*  */}
      {/* pop up screen */}
      {isPopUpOpen && (
        <div className="pop-up-overlay">
          <PopUpPage onClose={() => setIsPopUpOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default CheckOut;
