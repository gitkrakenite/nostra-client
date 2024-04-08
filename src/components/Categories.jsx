import React from "react";
import { Dummycategories } from "../constants";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div>
      {/* wrapper */}
      <div>
        <div className="flex justify-between sm:justify-evenly flex-wrap gap-[25px] sm:gap-[1.2em]">
          {Dummycategories.map((item) => (
            <div key={item.id}>
              <Link to={`/home?cat=${item.link}`}>
                <div className="flex gap-2 sm:gap-8 items-center">
                  <div>
                    <img
                      src={item.photo}
                      alt=""
                      className=" w-[40px] sm:w-[100px] object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold mb-2 sm:mb-4 text-xl">
                      {item.title}
                    </h2>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* bottom */}
      </div>
    </div>
  );
};

export default Categories;
