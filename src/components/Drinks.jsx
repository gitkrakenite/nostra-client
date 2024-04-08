import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineComment,
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import "./masonry.css";
import { BiPhoneCall } from "react-icons/bi";
import logo from "../assets/chlogo.png";
import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "./Spinner";

const Drinks = () => {
  const [allDrinks, setAllDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchFood = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/drinks/all");
      if (response) {
        setLoading(false);
        setAllDrinks(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching drinks");
    }
  };

  useEffect(() => {
    handleFetchFood();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };

  //   pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allDrinks?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allDrinks?.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);

  const handleClick = (number) => {
    setStart(number);
    setEnd(number + 3);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handleClick(currentPage);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
      handleClick(currentPage);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  // search  states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  // search user func
  const handleSearchChange = async (e) => {
    e.preventDefault();
    clearTimeout(setsearchTimeout);

    setSearchText(e.target.value);

    // console.log(searchText);

    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allDrinks.filter(
          (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  // scroll to top functionality
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        console.error("Error reading from localStorage:", error);
      }
    };

    countItemsInCart(); // Call the function when the component mounts
  }, []);

  return (
    <div className="">
      {/* arrow to scroll to top */}
      {showArrow && (
        <div
          className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-red-700 text-zinc-50 rounded-full p-[5px]"
          onClick={handleScrollTop}
        >
          <AiOutlineArrowUp />
        </div>
      )}

      {/* logo and options */}

      {!searchText && (
        <div className="flex justify-between items-center px-1 sm:px-2">
          <div>
            <img src={logo} alt="" className="w-16 h-16" />
          </div>
          <div className="flex gap-[20px] items-center">
            <Link to="/home">
              <p>FOOD</p>
            </Link>
            <Link to="/cart" className="flex gap-1">
              <p>
                <AiOutlineShoppingCart className="text-2xl" />
              </p>
              <p className="mt-[-10px] ">{cartItemCount}</p>
            </Link>
            <div className="flex gap-[10px] sm:gap-[2em] ">
              <a href="tel:0702610175" title="call us">
                <BiPhoneCall className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* search bar & categories */}
      <div className=" w-full mt-[1em]">
        {/* searchbar */}
        <div className="w-full flex justify-center">
          <form className=" w-[98%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] bg-zinc-300 flex gap-[5px] items-center p-[8px] rounded-xl">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search For drinks"
              className="bg-transparent outline-none w-full "
              required
              // maxLength={15}
              // minLength={2}
              value={searchText}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        {/* categories */}
      </div>

      {/* wrapper */}

      {loading ? (
        <div className="h-[70vh] w-full flex justify-between items-center">
          <Spinner message="Fetching drinks" />
        </div>
      ) : (
        <div className=" px-[10px] sm:px-[1em] md:px-[2em] lg:px-[4em]  xl:px-[5em]">
          {/* pagination */}
          {!searchText && (
            <nav className="flex justify-center">
              <ul className="flex gap-[2em] mt-[10px] px-[5px] py-[10px] items-center ">
                {/* map */}

                <>
                  <li>
                    <a href="#" onClick={prevPage} className="text-zinc-800">
                      <p className="text-zinc-500 font-bold hover:text-zinc-900">
                        Prev
                      </p>
                    </a>
                  </li>
                  <li className="flex gap-[10px] ">
                    {numbers.slice(start - 1, end).map((item, index) => (
                      <li
                        key={index}
                        className={`normal-nav ${
                          currentPage === item && "active-nav"
                        }`}
                      >
                        <a
                          href="#"
                          onClick={() => {
                            handleClick(item);
                            changeCurrentPage(item);
                          }}
                        >
                          <p className="">{item}</p>
                        </a>
                      </li>
                    ))}
                  </li>

                  <li>
                    <a href="#" onClick={nextPage}>
                      <p className="text-zinc-500 font-bold hover:text-zinc-900">
                        Next
                      </p>
                    </a>
                  </li>
                </>
              </ul>
            </nav>
          )}
          {/* drinks */}
          <div>
            {searchText ? (
              <>
                <div className="mb-[15px] text-zinc-400">
                  {searchText && <p>Results For : {searchText}</p>}
                </div>

                {searchedResults?.length > 0 ? (
                  <div>
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid "
                      columnClassName="my-masonry-grid_column"
                    >
                      {searchedResults?.map((item) => (
                        <Link to={`/drink/${item._id}`}>
                          <div key={item._id} className="flex-shrink-0 mb-3">
                            <div className="relative rounded-lg group ">
                              <div className="overlay absolute inset-0 flex items-center justify-center opacity-100">
                                <div
                                  className="bg-gradient-to-t
                                  from-transparent to-black opacity-75 w-full h-full rounded-md"
                                >
                                  {/* top stats */}
                                  <div>
                                    <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                      <div>
                                        <p className="text-white">
                                          #{item.category}
                                        </p>
                                      </div>
                                      <div className="flex gap-[20px]">
                                        <p className="text-white text-md flex items-center gap-[5px]">
                                          <AiOutlineLike className="text-lg" />
                                          <span>{item.likes?.length}</span>
                                        </p>
                                        <p className="text-white text-md flex items-center gap-[5px]">
                                          <AiOutlineComment className="text-lg" />
                                          <span>{item.comments?.length}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/*  */}
                                </div>
                              </div>

                              <img
                                src={item.image}
                                alt=""
                                className=" rounded-lg"
                              />

                              <div className="flex justify-between items-center text-zinc-700 mt-[5px]">
                                <p className="text-zinc-900 font-bold">
                                  {item.title}
                                </p>
                                <p className="text-zinc-800">
                                  Ksh. {item.price}
                                </p>
                              </div>
                            </div>
                            {/*  */}
                          </div>
                        </Link>
                      ))}
                    </Masonry>
                  </div>
                ) : (
                  <div className="w-full h-[65vh] flex justify-between items-center">
                    <p className="text-center w-full justify-center flex">
                      😥No results for :
                      <span className="text-red-600">{searchText}</span>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid "
                  columnClassName="my-masonry-grid_column"
                >
                  {records?.map((item) => (
                    <Link to={`/drink/${item._id}`}>
                      <div key={item._id} className="flex-shrink-0 mb-3">
                        <div className="relative rounded-lg group ">
                          <div className="overlay absolute inset-0 flex items-center justify-center opacity-100">
                            <div
                              className="bg-gradient-to-t
                                  from-transparent to-black opacity-75 w-full h-full rounded-md"
                            >
                              {/* top stats */}
                              <div>
                                <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                  <div>
                                    <p className="text-white">
                                      #{item.category}
                                    </p>
                                  </div>
                                  <div className="flex gap-[20px]">
                                    <p className="text-white text-md flex items-center gap-[5px]">
                                      <AiOutlineLike className="text-lg" />
                                      <span>{item.likes?.length}</span>
                                    </p>
                                    <p className="text-white text-md flex items-center gap-[5px]">
                                      <AiOutlineComment className="text-lg" />
                                      <span>{item.comments?.length}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/*  */}
                            </div>
                          </div>

                          <img
                            src={item.image}
                            alt=""
                            className=" rounded-lg"
                          />

                          <div className="flex justify-between items-center text-zinc-700 mt-[5px]">
                            <p className="text-zinc-900 font-bold">
                              {item.title}
                            </p>
                            <p className="text-zinc-800">Ksh. {item.price}</p>
                          </div>
                        </div>
                        {/*  */}
                      </div>
                    </Link>
                  ))}
                </Masonry>
              </>
            )}
          </div>
        </div>
      )}

      {/* end wrapper */}
    </div>
  );
};

export default Drinks;
