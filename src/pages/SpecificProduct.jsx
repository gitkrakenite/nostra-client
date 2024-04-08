import React, { useCallback, useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineComment,
  AiOutlineLike,
} from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "../components/Comment";

import axios from "../axios";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const SpecificProduct = () => {
  const { user } = useSelector((state) => state.auth);

  // fetch the product
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      let checkParam = id;
      const response = await axios.get("/product/" + checkParam);
      if (response) {
        setLoading(false);
        setSingleProduct([response.data]);
        // console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Product.");
      toast.error("Network error or doesn't exist");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const [cartItemCount, setCartItemCount] = useState(0);
  let [newQuantity, setNewQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  let [newPrice, setNewPrice] = useState(0);

  const handleChooseSize = (size) => {
    setSelectedSize(size);
  };

  const handleChooseColor = (color) => {
    setSelectedColor(color);
  };

  // let us use localstorage to store cart
  const handleAddCart = useCallback(async (product, extraData) => {
    // Retrieve the existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      // Product already exists, return a message
      toast.error("Already Added To Cart");
      return;
    }

    if (selectedSize.length < 1)
      return toast.error("Please Select Size", { theme: "dark" });
    if (selectedColor.length < 1)
      return toast.error("Please Select Color", { theme: "dark" });

    // Merge the product and extraData into a new object
    const productWithExtraData = { ...product, ...extraData };

    // Create a new cart with the existing items and the new product
    const updatedCart = [...cartItems, productWithExtraData];

    console.log(extraData);

    // Update the cart items in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update the cart item count in the parent component
    setCartItemCount((prevCount) => prevCount + 1);

    toast.success(`${product.title} added to Cart`);
    return;
  });

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
  }, [handleAddCart]);

  const [quantity, setQuantity] = useState(1);

  // like product
  const handleLikeProduct = async (product) => {
    try {
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

      let username = user.username;
      let id = product._id;
      let likeData = { username, config };

      await axios.post("/product/like/" + id, likeData, config);
      window.location.reload();
    } catch (error) {
      toast.error("Failed To Like");
    }
  };

  const navigate = useNavigate();

  // let us use localstorage to store cart
  const handleCheckOut = async (product, extraData) => {
    if (selectedSize.length < 1)
      return toast.error("Please Select Size", { theme: "dark" });
    if (selectedColor.length < 1)
      return toast.error("Please Select Color", { theme: "dark" });

    // Clear the existing cart items
    localStorage.setItem("cart", JSON.stringify([]));

    // Retrieve the existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      navigate("/cart");
      toast.info("Already Added To Cart");
      return;
    } else {
      // Clear the existing cart items
      localStorage.setItem("cart", JSON.stringify([]));

      // Merge the product and extraData into a new object
      const productWithExtraData = { ...product, ...extraData };

      // Create a new cart with the existing items and the new product
      const updatedCart = [...cartItems, productWithExtraData];

      // Update the cart items in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Update the cart item count in the parent component
      setCartItemCount((prevCount) => prevCount + 1);

      navigate("/checkout");
      return;
    }
  };

  const [activeImg, setActiveImg] = useState(null);

  const checkTheMainPhoto = (url) => {
    setActiveImg(url);
  };

  useEffect(() => {
    checkTheMainPhoto();
  }, []);

  return (
    <div>
      {/* wrapper */}
      <div>
        {/* topbar */}
        <div className="w-full ">
          <Link to="/home">
            <div className=" px-2 sm:px-8 py-[1em] flex items-center gap-[10px]">
              <AiOutlineArrowLeft className="text-xl" />
              <p>Back Shopping</p>
            </div>
          </Link>
        </div>

        {/* product */}

        {loading ? (
          <div className="w-full h-[78vh] justify-center flex ">
            <Spinner message="Fetching Product" />
          </div>
        ) : (
          <div>
            <div className=" px-[10px] md:px-[3em] xl:px-[5em]">
              {singleProduct?.map((item) => (
                <>
                  <div
                    key={item.id}
                    className="flex flex-col lg:flex-row gap-[2em]"
                  >
                    {/* image side */}
                    <div className=" flex-[0.5] xl:flex-[0.5]">
                      <img
                        src={activeImg ? activeImg : item.fPhoto}
                        alt=""
                        className="w-full max-h-[500px] rounded-xl object-contain"
                      />

                      {/* small images */}
                      <div className="mt-[20px] flex gap-[10px] justify-center">
                        <img
                          src={item.sPhoto}
                          alt=""
                          className=" h-[80px] w-[80px] sm:h-[200px] sm:w-[200px]  object-cover rounded-lg"
                          onClick={() => checkTheMainPhoto(item.sPhoto)}
                        />
                        <img
                          src={item.tPhoto}
                          alt=""
                          className="h-[80px] w-[80px] sm:h-[200px] sm:w-[200px] object-cover rounded-lg"
                          onClick={() => checkTheMainPhoto(item.tPhoto)}
                        />
                        <img
                          src={item.fPhoto}
                          alt=""
                          className="h-[80px] w-[80px] sm:h-[200px] sm:w-[200px] object-cover rounded-lg"
                          onClick={() => checkTheMainPhoto(item.fPhoto)}
                        />
                      </div>
                    </div>
                    {/* text side */}
                    <div className="flex-[0.5]">
                      {/* options */}
                      <div className="flex justify-between">
                        <div>
                          <p className="text-2xl font-bold mb-2">
                            {item.title}
                          </p>
                        </div>

                        {user && (
                          <div className="flex items-center gap-[1em]">
                            <div className="flex items-center gap-2">
                              <AiOutlineLike
                                className="text-2xl text-pink-600 cursor-pointer z-10"
                                title="Like This Product"
                                onClick={() => handleLikeProduct(item)}
                              />
                              <p>{item.likes.length}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <AiOutlineComment className="text-2xl text-pink-600 " />
                              <p>{item.comments.length}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* add or check out */}
                      <div className="flex gap-2 my-[1em]">
                        {item.available ? (
                          <div className="flex gap-2">
                            <div className="flex gap-[20px] justify-between items-center">
                              <button
                                onClick={() =>
                                  handleAddCart(item, {
                                    newQuantity: quantity,
                                    newPrice,
                                    selectedColor,
                                    selectedSize,
                                  })
                                }
                                className="bg-pink-700 text-white p-2 rounded-lg"
                              >
                                Add To Cart
                              </button>
                              <button
                                onClick={() =>
                                  handleCheckOut(item, {
                                    newQuantity: quantity,
                                    newPrice,
                                    selectedColor,
                                    selectedSize,
                                  })
                                }
                                className="border border-pink-700  p-2 rounded-lg"
                              >
                                Direct Checkout
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="bg-orange-700 text-white p-2 rounded-md">
                            Cannot Add To Cart
                          </span>
                        )}
                      </div>
                      {/*  */}
                      <div>
                        <div className="my-[1em]">
                          <div className="flex justify-between items-center">
                            <p className="text-teal-700">from {item.vendor}</p>
                            <div>
                              {item.onOffer == "yes" && (
                                <p className="text-red-700 font-bold">
                                  😉on offer
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="mb-[2em]">{item.description}</p>
                        <p className="mb-[2em]">
                          {item.available ? (
                            <span className="bg-emerald-700 text-white p-2 rounded-md">
                              available
                            </span>
                          ) : (
                            <span className="bg-orange-700 text-white p-2 rounded-md">
                              not available
                            </span>
                          )}
                        </p>
                        {/* choose Size */}
                        <p className=" mt-10 mb-4 text-xl text-zinc-400 font-semibold">
                          Select Preferred Size
                        </p>
                        <div className="mb-[1.8em] flex sm:justify-center gap-5 flex-wrap sm:gap-10">
                          {item.sizes.map((size, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleChooseSize(size)}
                              className="cursor-pointer"
                            >
                              <p
                                className={`border ${
                                  selectedSize === size
                                    ? "border-pink-500"
                                    : "border-zinc-300"
                                }  px-4 py-2 rounded-xl`}
                              >
                                {size}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* choose colors */}
                        <p className=" mt-10 mb-4 text-xl text-zinc-400 font-semibold">
                          Select Preferred Color
                        </p>
                        <div className="mb-[1.8em] flex sm:justify-center gap-5 flex-wrap sm:gap-10">
                          {item.availableColors.map((color, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleChooseColor(color)}
                              className={`flex gap-2 items-center border ${
                                selectedColor === color
                                  ? "border-pink-500"
                                  : "border-zinc-300"
                              }  px-4 py-2 rounded-xl cursor-pointer  `}
                            >
                              <div
                                className={`w-[20px] h-[20px] rounded-full `}
                                style={{ backgroundColor: color }}
                              />
                              <p>{color}</p>
                            </div>
                          ))}
                        </div>
                        {/*  */}
                        <div className="flex justify-between items-center">
                          <div className=" flex gap-4 items-center">
                            <div>
                              <p>Add Quantity</p>
                            </div>
                            <select
                              name="quantity"
                              id="quantity"
                              className="bg-zinc-800 rounded-md text-white p-2"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            >
                              {[...Array(item.quantity)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="">
                            <p className="text-xl font-semibold text-zinc-500">
                              ${" "}
                              {
                                (newPrice =
                                  parseInt(item.price) * parseInt(quantity))
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* comments` */}
                      <div className="mt-[4em]">
                        <Comment item={item} />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificProduct;
