import React from "react";
import MainNav from "../components/MainNav";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import Offer from "../components/Offer";
import Values from "../components/Values";
import Footer from "../components/Footer";

const Splash = () => {
  return (
    <div>
      {/* topstrip */}
      <div className="bg-zinc-900 p-2 text-center hidden md:flex justify-center">
        <h2 className="text-zinc-300">
          NEW ARRIVALS TAKE A LOOK AT WHAT'S NEW THIS WEEK
        </h2>
      </div>

      {/* padding content */}
      <div className=" px-[10px]  sm:px-[1em] lg:px-[2em]">
        {/* navigation 1*/}
        <div>
          <MainNav />
        </div>
        {/* hero section*/}
        <div className="mt-[20px]">
          <Hero />
        </div>
        {/* category section*/}
        <div className="mt-[4em]">
          <Categories />
        </div>
        {/* trending section*/}
        <div className="mt-[4em]">
          <Trending />
        </div>
      </div>
      {/* offer section*/}
      <div className="mt-[4em]">
        <Offer />
      </div>
      {/* values section*/}
      <div className=" px-[10px]  sm:px-[1em] lg:px-[2em] mt-[4em]">
        <Values />
      </div>
      {/* footer section*/}
      <div className="mt-[10em]">
        <Footer />
      </div>
    </div>
  );
};

export default Splash;
