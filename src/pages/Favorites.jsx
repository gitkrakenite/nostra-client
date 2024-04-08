import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { LuHeartCrack } from "react-icons/lu";
import { toast } from "react-toastify";
import Masonry from "react-masonry-css";

const Favorites = () => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
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

  // fetch products from favorites
  const [products, setProducts] = useState([]);
  function getSortedProductsFromLocalStorage() {
    // Retrieve the favorite items from localStorage
    const favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];

    // Sort the items in reverse order based on the timestamp or any other relevant property
    const sortedfavoriteItems = favoriteItems.sort(
      (a, b) => b.timestamp - a.timestamp
    );

    // Update the cart state with the sorted products
    setProducts(sortedfavoriteItems);
  }

  useEffect(() => {
    getSortedProductsFromLocalStorage();
  }, []);

  const handleRemoveFromFavorites = (id) => {
    // Retrieve the favorite items from localStorage
    const favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];

    // Filter out the product with the specified ID
    const updatedfavoriteItems = favoriteItems.filter(
      (item) => item._id !== id
    );

    // Update the favorite state and localStorage with the updated favorite items
    setProducts(updatedfavoriteItems);
    localStorage.setItem("favorites", JSON.stringify(updatedfavoriteItems));
    getSortedProductsFromLocalStorage();
    toast.success("Removed From Favorites");
  };

  return (
    <div>
      {/* wrapper */}
      <div className=" px-[10px]  sm:px-[1em] lg:px-[2em]">
        <div className="mt-[1em] mb-[3em]">
          <Link to="/home">
            <IoIosArrowRoundBack className="text-3xl" />
          </Link>
        </div>

        {products?.length < 1 ? (
          <div className="h-[74vh] w-full flex justify-center items-center">
            <p>😥 Not Added Favorite yet</p>
          </div>
        ) : (
          <>
            <div>
              <h2 className="my-[1em] text-2xl font-semibold text-zinc-400">
                Your Favorites
              </h2>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid "
                columnClassName="my-masonry-grid_column"
              >
                {products?.map((item) => (
                  <div key={item.id}>
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.fPhoto}
                        alt={item.title}
                        className="rounded-md w-full max-h-[480px] object-cover"
                      />
                    </Link>
                    <div className="flex justify-between items-center my-2">
                      <p className=" font-semibold">{item.title}</p>
                      <p className=" font-semibold">#{item.vendor}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p>${item.price}</p>
                      </div>
                      <div className="flex gap-8 items-center">
                        <LuHeartCrack
                          className="text-2xl cursor-pointer text-pink-500"
                          title="remove"
                          onClick={() => handleRemoveFromFavorites(item._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
