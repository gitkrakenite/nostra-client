import {
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineLike,
  AiOutlineSearch,
} from "react-icons/ai";

import { Link, useLocation } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import "./masonry.css";
import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "./Spinner";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const AllProducts = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("cat");

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchProducts = async () => {
    try {
      setLoading(true);
      if (category) {
        let dataToSend = { categories: [category] };
        console.log(dataToSend);
        let response = await axios.post("/product/cat", dataToSend);
        if (response) {
          setLoading(false);
          setAllProducts(response.data);
        }
        return;
      }
      const response = await axios.get("/product");
      if (response) {
        setLoading(false);
        setAllProducts(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error Fetching Products");
    }
  };

  useEffect(() => {
    handleFetchProducts();
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
  const records = allProducts?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allProducts?.length / recordsPerPage);
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
        const searchResults = allProducts?.filter(
          (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase())
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

  // handle fetch onOffer
  const [onOffer, setOnOffer] = useState([]);

  const handleFetchOffers = async () => {
    try {
      let dataToSend = { onOffer: "yes" };
      const response = await axios.post("/product/offer", dataToSend);
      if (response) {
        setOnOffer(response.data);
      }
    } catch (error) {
      // setLoading(false);
      console.log("Error");
      // toast.error("Error Fetching Offers");
    }
  };

  useEffect(() => {
    handleFetchOffers();
  }, []);

  const [favorites, setFavorites] = useState([]);
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites && Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites);
    }
  }, []);

  const addToFavorites = (product) => {
    const newFavorites = [...favorites, product];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const isFavorite = (product) => {
    return favorites.some((favorite) => favorite._id === product._id);
  };

  return (
    <div className="px-[10px] sm:px-[30px]">
      {/* arrow to scroll to top */}
      {showArrow && (
        <div
          className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-red-700 text-zinc-50 rounded-full p-[5px]"
          onClick={handleScrollTop}
        >
          <AiOutlineArrowUp />
        </div>
      )}

      {/* Offers */}
      {onOffer.length > 0 && !searchText && (
        <div className="mt-[1em]">
          <div className="mb-[15px] flex items-center gap-2">
            <p className="">SCROLL ON OFFER</p>
            <p>
              <AiOutlineArrowRight />
            </p>
          </div>
          {/* DATA */}
          <div>
            <div className="flex gap-[10px] overflow-x-scroll w-full prompt pb-2">
              <div className="flex flex-nowrap">
                {onOffer?.map((item) => (
                  <div key={item._id} className="flex-shrink-0 mr-[15px]">
                    <Link to={`/product/${item._id}`}>
                      <div className="relative rounded-lg group ">
                        <div className="overlay absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-100">
                          <div
                            className="bg-gradient-to-t
                                  from-transparent to-black opacity-75 w-full h-full rounded-md"
                          >
                            {/* top stats */}
                            <div>
                              <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                <div>
                                  <p className="text-white">{item.vendor}</p>
                                </div>
                                <div className="flex gap-[20px]">
                                  <p className="text-white text-md flex items-center gap-[5px]">
                                    <AiOutlineLike className="text-lg" />
                                    <span>{item.likes.length}</span>
                                  </p>
                                  <p className="text-white text-md flex items-center gap-[5px]">
                                    <span>Ksh. {item.price}</span>
                                  </p>
                                </div>
                              </div>
                              <div className="absolute top-[80px] left-3">
                                <p className="text-white">{item.title}</p>
                              </div>
                            </div>
                            {/*  */}
                            <div className="absolute bottom-[20px] left-[20px]  flex gap-[10%] w-full ">
                              <div>
                                <div className="flex gap-[10px] text-zinc-300">
                                  {/* <p>{item.location}</p> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <img
                          src={item.image}
                          alt=""
                          className="w-72 h-80 rounded-md object-cover"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/*  */}
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
              placeholder="Search"
              className="bg-transparent outline-none w-full "
              required
              value={searchText}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>

      {/* wrapper */}

      <div className="mt-[1em]">
        {/* pagination */}
        {!searchText && (
          <nav className="flex justify-end">
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
        {/* food */}
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
                      <div className="mb-8" key={item._id}>
                        <div className="relative rounded-lg group ">
                          <Link to={`/product/${item._id}`}>
                            <div className="overlay absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-100 ">
                              <div
                                className="bg-gradient-to-t
                                  from-transparent to-black opacity-90 w-full h-full rounded-md"
                              >
                                {/* top stats */}
                                <div>
                                  <div className="absolute top-[20px]   w-full px-2 ">
                                    <div className="mb-[2em] w-full flex justify-between">
                                      <p className="text-white text-md flex items-center gap-[5px]">
                                        #{item.vendor}
                                      </p>
                                      <div>
                                        <p className="text-white text-md flex items-center gap-[5px]">
                                          <AiOutlineLike className="text-lg" />
                                          <span>{item.likes.length}</span>
                                        </p>
                                      </div>
                                    </div>
                                    {/* likes and stats */}
                                    <div className="flex gap-[30px] mb-[1em]">
                                      <p className="text-white">{item.title}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="min-h-[300px]">
                              <img
                                src={item.fPhoto}
                                alt=""
                                className="rounded-md w-full max-h-[490px] object-cover"
                                loading="lazy"
                                // onLoad={() => alert("loaded")}
                              />
                            </div>
                          </Link>
                        </div>
                        {/* more items */}
                        <div className="mt-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p> {item.title}</p>
                            </div>
                            <div className="flex items-center gap-8">
                              <p>${item.price}</p>
                              <div>
                                {isFavorite(item) ? (
                                  <FaHeart
                                    className="text-2xl text-pink-500 cursor-pointer "
                                    title="Added to favorites"
                                  />
                                ) : (
                                  <FaRegHeart
                                    className="text-2xl text-pink-500 cursor-pointer "
                                    onClick={() => addToFavorites(item)}
                                    title="Add to favorites"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
              {loading ? (
                <div className="mt-[8em]">
                  <Spinner message="Fetching ..." />
                </div>
              ) : (
                <>
                  {records.length < 1 ? (
                    <div className="mt-[8em] text-center">
                      <div>
                        😥No results {category && `for ${category} category`}{" "}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {category && (
                        <p className="mb-[2em]">Category : {category}</p>
                      )}
                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid "
                        columnClassName="my-masonry-grid_column"
                      >
                        {records?.map((item) => (
                          <div className="mb-8" key={item._id}>
                            <div className="relative rounded-lg group ">
                              <Link to={`/product/${item._id}`}>
                                <div className="overlay absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-100 ">
                                  <div
                                    className="bg-gradient-to-t
                                     from-transparent to-black opacity-90 w-full h-full rounded-md"
                                  >
                                    {/* top stats */}
                                    <div>
                                      <div className="absolute top-[20px]   w-full px-2 ">
                                        <div className="mb-[2em] w-full flex justify-between">
                                          <p className="text-white text-md flex items-center gap-[5px]">
                                            #{item.vendor}
                                          </p>
                                          <div>
                                            <p className="text-white text-md flex items-center gap-[5px]">
                                              <AiOutlineLike className="text-lg" />
                                              <span>{item.likes.length}</span>
                                            </p>
                                          </div>
                                        </div>
                                        {/* likes and stats */}
                                        <div className="flex gap-[30px] mb-[1em]">
                                          <p className="text-white">
                                            {item.title}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="min-h-[300px]">
                                  <img
                                    src={item.fPhoto}
                                    alt=""
                                    className="rounded-md w-full max-h-[490px] object-cover"
                                    loading="lazy"
                                    // onLoad={() => alert("loaded")}
                                  />
                                </div>
                              </Link>
                            </div>
                            {/* more items */}
                            <div className="mt-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p> {item.title}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                  <p>${item.price}</p>
                                  <div>
                                    {isFavorite(item) ? (
                                      <FaHeart
                                        className="text-2xl text-pink-500 cursor-pointer "
                                        title="Added to favorites"
                                      />
                                    ) : (
                                      <FaRegHeart
                                        className="text-2xl text-pink-500 cursor-pointer "
                                        onClick={() => addToFavorites(item)}
                                        title="Add to favorites"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Masonry>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
};

export default AllProducts;
