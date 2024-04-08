import React from "react";

const Offer = () => {
  return (
    <div className=" mb-[1em] bg-pink-100 py-[10px]">
      {/* wrapper */}
      <div className="px-[10px]  sm:px-[1em] lg:px-[2em] flex flex-col md:flex-row gap-10 sm:gap-4 items-center  justify-between">
        {/* text side */}
        <div className="flex-[0.5] text-center">
          <h2 className="font-semibold text-2xl mb-6">THIS WEEKEND ONLY</h2>
          <h2 className="font-semibold text-2xl mb-6">UP TO 50% OFF ON ALL</h2>
          <h2 className="font-semibold text-2xl mb-6">BEAUTY PRODUCTS</h2>
          <button className="bg-black text-white px-12 py-6 rounded-xl">
            Shop Now
          </button>
        </div>
        {/* img side */}
        <div className="flex-[0.5] bg-pink-200">
          <img
            src="https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt=""
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Offer;
