import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp, AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/officialTwo.png";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

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

  // fetch products from localstorage
  const [products, setProducts] = useState([]);
  function getSortedProductsFromLocalStorage() {
    // Retrieve the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Sort the cart items in reverse order based on the timestamp or any other relevant property
    const sortedCartItems = cartItems.sort((a, b) => b.timestamp - a.timestamp);

    // Update the cart state with the sorted products
    setProducts(sortedCartItems);
  }

  useEffect(() => {
    getSortedProductsFromLocalStorage();
  }, []);

  // Function to calculate the total price of all items in the cart
  function calculateTotalPrice() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    for (const item of cartItems) {
      if (item.price && !isNaN(item.price)) {
        totalPrice += parseFloat(item.price); // Parse the price to a float and add it to the total
      }
    }

    return totalPrice;
  }

  // Call the calculateTotalPrice function to get the total price
  const totalPrice = calculateTotalPrice();

  const handleRemoveFromCart = (id) => {
    // Retrieve the cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter out the product with the specified ID
    const updatedCartItems = cartItems.filter((item) => item._id !== id);

    // Update the cart state and localStorage with the updated cart items
    setProducts(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    getSortedProductsFromLocalStorage();
    // Update the cart item count in the parent component
    // setCartItemCount((prevCount) => prevCount - 1);
    toast.success("Removed From Cart");
  };

  return (
    <div>
      {/* wrapper */}
      <div>
        {/* arrow to scroll to top */}
        {showArrow && (
          <div
            className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-red-700 text-zinc-50 rounded-full p-[5px]"
            onClick={handleScrollTop}
          >
            <AiOutlineArrowUp />
          </div>
        )}
      </div>
      {/* topbar */}
      <div className=" w-full h-full top-0  text-white px-[10px] sm:px-[1em] md:px-[3em] lg:px-[4em] xl:px-[5em]  ">
        <div className="flex justify-between items-center py-4">
          {/* logo */}
          <Link to="/home">
            <img src={logo} alt="" className="w-[50px]" />
          </Link>
        </div>
      </div>
      {/* display cart items */}
      {console.log(products)}
      <div className=" px-[10px] sm:px-[3em]">
        {products.length < 1 ? (
          <div className="my-[10em]">
            <h2 className="mb-[10px] text-center">
              Hello There. There is no product in the cart.{" "}
            </h2>
            <Link to="/home">
              <p className="text-red-600 underline text-center">
                Back Shopping
              </p>
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-[2em]">
              {products?.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-200 rounded-lg mb-[20px] px-1"
                >
                  <div className="rounded-lg flex items-center justify-between">
                    <div className=" flex flex-col gap-[40px]justify-between items-center">
                      <div>
                        <img
                          src={item.fPhoto}
                          alt=""
                          className="w-[100px] object-contain rounded-md"
                        />
                      </div>

                      <div>
                        <div>
                          <p className="font-bold my-[5px]">{item.title}</p>
                        </div>

                        <p>Total : ${parseInt(item.newPrice)}</p>
                        <div>
                          <p>Quantity : {item.newQuantity} pcs</p>
                          <div className="flex gap-4 items-center">
                            <div className="flex items-center gap-2 my-2">
                              <div
                                className="h-[10px] w-[10px] rounded-full"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                              <p>{item.selectedColor}</p>
                            </div>
                            <p>Size : {item.selectedSize}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p
                        className="text-orange-800 text-xl cursor-pointer"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <AiOutlineCloseCircle
                          title="Remove From Cart"
                          className="text-2xl"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Link to="/home">
                <p className="text-pink-500">CONTINUE SHOPPING</p>
              </Link>
              <Link to="/checkout">
                <p className="text-pink-500">CHECKOUT</p>
              </Link>
            </div>
          </>
        )}
      </div>
      {/*  */}
    </div>
  );
};

export default Cart;
