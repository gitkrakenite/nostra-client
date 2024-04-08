import React from "react";
import { BsBox } from "react-icons/bs";
import { TbHandClick } from "react-icons/tb";
import { CiMobile2 } from "react-icons/ci";
import { ImBoxRemove } from "react-icons/im";

const Values = () => {
  return (
    <div className="mb-[3em]">
      {/* wrapper */}
      <div className="flex justify-center sm:justify-between gap-5 flex-wrap">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="px-6 py-6 bg-pink-100 rounded-full">
              <BsBox className="text-3xl" />
            </div>
          </div>
          <h2 className="font-bold">Fast Delivery</h2>
          <p>Have your needs now</p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="px-6 py-6 bg-pink-100 rounded-full">
              <TbHandClick className="text-3xl" />
            </div>
          </div>
          <h2 className="font-bold">One-click Shop</h2>
          <p>Save your info, shop securely</p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="px-6 py-6 bg-pink-100 rounded-full">
              <CiMobile2 className="text-3xl" />
            </div>
          </div>
          <h2 className="font-bold">Mobile Pocket</h2>
          <p>Shop anywhere you want</p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="px-6 py-6 bg-pink-100 rounded-full">
              <ImBoxRemove className="text-3xl" />
            </div>
          </div>
          <h2 className="font-bold">Return Immediately</h2>
          <p>The return process is very easy</p>
        </div>
      </div>
    </div>
  );
};

export default Values;
