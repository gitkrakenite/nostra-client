import React, { useEffect, useState } from "react";

import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";

import AllProducts from "../components/AllProducts";
import Logo from "../assets/officialTwo.png";
import { BsHeart, BsPerson } from "react-icons/bs";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [cartItemCount, setCartItemCount] = useState(0);

  // read from state
  useEffect(() => {
    // Function to count the number of items in localStorage
    const countItemsInCart = () => {
      try {
        // Retrieve the existing cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        // Get the number of items in the cart
        const itemCount = cartItems.length;
        // Update the state with the item count
        setCartItemCount(itemCount);
      } catch (error) {
        // Handle any errors that might occur during parsing or reading from localStorage
        console.error("Error reading:", error);
      }
    };

    countItemsInCart(); // Call the function when the component mounts
  }, []);

  return (
    <div>
      {/* wrapper */}
      <div>
        {/* topbar */}
        <div>
          {user ? (
            <div>
              {/* navigation */}
              <div className=" flex justify-between items-center pt-[6px] sm:pt-7 pb-3 px-[10px] sm:px-[30px]">
                <Link to="/">
                  <div className="flex items-center gap-2">
                    <img
                      src={Logo}
                      alt="logo"
                      className="w-[40px] object-contain"
                    />
                    <p className="font-bold text-lg hidden sm:flex">NOSTRA</p>
                  </div>
                </Link>

                <div>
                  <div className="flex gap-[20px] sm:gap-[2em] items-center">
                    <Link to="/favorites">
                      <BsHeart className="text-2xl mt-1 cursor-pointer" />
                    </Link>
                    <Link to="/cart" className="flex">
                      <AiOutlineShopping className="text-3xl cursor-pointer" />
                      <div className=" rounded-full mt-[-12px]">
                        <p className="bg-pink-500 px-[5px] py-[0.8px] rounded-full text-white">
                          {cartItemCount}
                        </p>
                      </div>
                    </Link>

                    <Link to="/profile">
                      <img
                        src={
                          user?.profile ||
                          "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400"
                        }
                        alt="profile"
                        className="h-[45px] w-[45px] object-cover rounded-full"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* navigation */}
              <div className=" flex justify-between items-center pt-3 sm:pt-7 pb-3 px-[10px] sm:px-[30px]">
                <div className="flex items-center gap-2">
                  <img
                    src={Logo}
                    alt="logo"
                    className="w-[40px] object-contain"
                  />
                  <p className="font-bold text-lg hidden sm:visible">NOSTRA</p>
                </div>

                <div>
                  <div className="flex gap-[20px] sm:gap-[2em] items-center">
                    <Link to="/favorites">
                      <BsHeart className="text-2xl mt-1 cursor-pointer" />
                    </Link>
                    <Link to="/cart" className="flex">
                      <AiOutlineShopping className="text-3xl cursor-pointer" />
                      <div className=" rounded-full mt-[-12px]">
                        <p className="bg-pink-500 px-[5px] py-[0.8px] rounded-full text-white">
                          {cartItemCount}
                        </p>
                      </div>
                    </Link>

                    <BsPerson
                      className="text-3xl cursor-pointer"
                      onClick={handleLogout}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <AllProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
