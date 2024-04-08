import React, { useEffect, useState } from "react";
import Logo from "../assets/officialTwo.png";
import { NavLink } from "../constants";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineShopping } from "react-icons/ai";
import { BsHeart, BsPerson } from "react-icons/bs";
import { CiMenuBurger } from "react-icons/ci";
import { useSelector } from "react-redux";

const MainNav = () => {
  const { user } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);

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
        console.error("Error reading from localStorage:", error);
      }
    };

    countItemsInCart(); // Call the function when the component mounts
  }, []);

  return (
    <div>
      {/* wrapper */}
      {/* desktop nav */}
      <div className="  mt-[1em] hidden md:flex justify-between pt-5 pb-3">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-[40px] object-contain" />
          <p className="font-bold text-lg">NOSTRA</p>
        </div>

        <ul className="flex gap-[20px] items-center">
          {NavLink.map((item) => (
            <Link to={`/home?cat=${item.link}`} key={item.id}>
              <li className="font-semibold">{item.title}</li>
            </Link>
          ))}
          <Link to="/home">
            <li className="font-semibold">EXPLORE</li>
          </Link>
        </ul>

        <div>
          <div className="flex gap-[2em] items-center">
            <Link to="/favorites">
              <BsHeart className="text-2xl mt-1 cursor-pointer" />
            </Link>
            <Link to="/cart" className="flex">
              <AiOutlineShopping className="text-3xl cursor-pointer" />
              <div className=" rounded-full mt-[-20px]">
                <p className="bg-pink-500 px-[6px] py-[1px] rounded-full text-white">
                  {cartItemCount}
                </p>
              </div>
            </Link>

            {user ? (
              <Link to="/profile">
                <img
                  src={
                    user?.profile ||
                    "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400"
                  }
                  alt="profile"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <BsPerson className="text-3xl cursor-pointer" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* mobile navigation */}
      <div
        className=" w-full bg-[#ffffff]  z-20 md:hidden px-[10px] py-2"
        style={{
          // position: "-webkit-sticky",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        {/* top part */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="logo" className="w-[40px] object-contain" />
            <p className="font-bold text-lg">NOSTRA</p>
          </div>
          <div>
            {toggle ? (
              <>
                <AiOutlineClose
                  className="text-3xl cursor-pointer"
                  onClick={() => {
                    setToggle(false);
                    document.body.style.overflow = "auto";
                  }}
                />
              </>
            ) : (
              <CiMenuBurger
                className="text-3xl cursor-pointer"
                onClick={() => {
                  setToggle(true);
                  document.body.style.overflow = "hidden";
                }}
              />
            )}
          </div>
        </div>

        {toggle && (
          <div className="h-[100vh]">
            <div className="flex flex-col gap-[20px] items-end mt-[2em] w-full">
              <ul className="w-full text-end">
                {NavLink.map((item) => (
                  <Link to={`/home?cat=${item.link}`} key={item.id}>
                    <li
                      className="font-semibold"
                      onClick={() => {
                        setToggle(false);
                        document.body.style.overflow = "auto";
                      }}
                    >
                      {item.title}
                    </li>
                    <div className="h-[2px] w-full bg-zinc-400 my-3" />
                  </Link>
                ))}
                <Link to="/home">
                  <li
                    className="font-semibold"
                    onClick={() => {
                      setToggle(false);
                      document.body.style.overflow = "auto";
                    }}
                  >
                    EXPLORE
                  </li>
                  <div className="h-[2px] w-full bg-zinc-400 my-3" />
                </Link>
              </ul>
            </div>
            {/*  */}
            <div className="mt-[3em]">
              <div className="flex gap-[2em] items-end justify-end">
                <Link to="/favorites">
                  <BsHeart
                    className="text-2xl mt-1 cursor-pointer"
                    onClick={() => {
                      setToggle(false);
                      document.body.style.overflow = "auto";
                    }}
                  />
                </Link>
                <Link to="/cart" className="flex">
                  <AiOutlineShopping
                    className="text-3xl cursor-pointer"
                    onClick={() => {
                      setToggle(false);
                      document.body.style.overflow = "auto";
                    }}
                  />
                  <div className=" rounded-full mt-[-20px]">
                    <p className="bg-pink-500 px-[6px] py-[1px] rounded-full text-white">
                      {cartItemCount}
                    </p>
                  </div>
                </Link>

                {user ? (
                  <Link to="/profile">
                    <img
                      src={
                        user?.profile ||
                        "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400"
                      }
                      alt="profile"
                      className="w-[40px] h-[40px] rounded-full object-cover"
                      onClick={() => {
                        setToggle(false);
                        document.body.style.overflow = "auto";
                      }}
                    />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => {
                        setToggle(false);
                        document.body.style.overflow = "auto";
                      }}
                    >
                      <BsPerson className="text-3xl cursor-pointer" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNav;
