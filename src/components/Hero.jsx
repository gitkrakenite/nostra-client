import React from "react";

const Hero = () => {
  return (
    <div className="relative mt-[4em] md:mt-0">
      <div className="w-full h-[53vh] sm:h-[45vh]">
        <img
          src="https://images.pexels.com/photos/2088208/pexels-photo-2088208.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Background Placeholder"
          className="w-full h-[53vh] sm:h-[45vh] object-cover rounded-lg"
        />

        {/* overlay div */}
        <div className="absolute top-0 left-0 rounded-lg w-full h-full bg-[rgba(0,0,0,.5)]" />
        {/* top part */}
        <div className="absolute w-full h-full top-0 flex flex-col justify-start items-start text-white pl-[10px] sm:pl-[2em] pt-3">
          <div className="">
            <div className="">
              <p className="text-xl mb-4 font-semibold">
                BRING THE LOOK TO LIFE
              </p>
              <p className="text-xl mb-4 font-semibold">
                WITH OUR FASHION PICKS
              </p>
              <p className="text-xl mb-4 underline">SHOP NOW</p>
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full top-0 flex flex-col justify-center items-end text-white pl-[2em] pt-3">
          <div>
            <div className="flex">
              <img
                src="https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt=""
                className=" hidden lg:flex  w-[260px] h-[260px] mt-[-2em] object-cover rounded-full"
              />
              <img
                src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt=""
                className="w-[160px] h-[160px] mt-[3.6em] sm:mb-[-2em] object-cover rounded-full"
              />
              <img
                src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt=""
                className="hidden lg:flex w-[260px] h-[260px] object-cover rounded-full"
              />
              <img
                src="https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt=""
                className="w-[160px] h-[160px]  mt-[2.4em] sm:mb-[-2em] object-cover rounded-full hideGalaxyFold"
              />
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full bottom-0 flex flex-col justify-end text-white pl-[10px] sm:pl-[2em] pb-3">
          <p className=" text-2xl sm:text-6xl">UNIQUE FASHION STYLE</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
