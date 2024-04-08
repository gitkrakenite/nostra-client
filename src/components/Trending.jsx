import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "../axios";
import Masonry from "react-masonry-css";

const Trending = () => {
  const [trendingFashion, setTrendingFashion] = useState([]);

  const breakpointColumnsObj = {
    default: 6,
    3000: 6,
    2000: 6,
    1200: 3,
    1000: 2,
    340: 1,
  };

  const handleFetchTrending = async () => {
    try {
      const trending = "yes";
      let dataToSend = { trending };
      const response = await axios.post("/product/trending", dataToSend);
      if (response) {
        setTrendingFashion(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchTrending();
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
    <div>
      {trendingFashion.length > 0 && (
        <>
          {/* wrapper */}
          <h2 className="mb-[1em] font-semibold text-3xl">Trending Now</h2>
          <div>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid "
              columnClassName="my-masonry-grid_column"
            >
              {trendingFashion.map((item) => (
                <div key={item._id}>
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.fPhoto}
                      alt={item.title}
                      className="rounded-xl mb-5 w-full object-cover"
                    />
                  </Link>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-semibold text-lg ">{item.title}</p>
                    <p>$ {item.price}</p>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <p>#{item.vendor}</p>
                    <div className="flex gap-10 items-center">
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
                      {/* <MdOutlineShoppingCart className="text-2xl text-pink-500 cursor-pointer " /> */}
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          </div>
        </>
      )}
    </div>
  );
};

export default Trending;
