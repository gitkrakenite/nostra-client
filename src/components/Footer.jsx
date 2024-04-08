import React from "react";

const Footer = () => {
  return (
    <div className=" pb-[1em] bg-zinc-200 py-[10px]">
      {/* wrapper */}
      <div className="px-[10px]  sm:px-[1em] lg:px-[2em] ">
        <div className="flex gap-6 flex-wrap justify-between mb-[20px]">
          {/* first column */}
          <div>
            <ul>
              <li className="font-semibold mb-1">HELP</li>
              <li>Customer Service</li>
              <li>Live Chat</li>
              <li>About Vs Credit Card</li>
              <li>Find a Store</li>
              <li>Careers</li>
            </ul>
          </div>
          {/* second column */}
          <div>
            <ul>
              <li className="font-semibold mb-1">ODERS & RETURNS</li>
              <li>Order Status</li>
              <li>Shipping information</li>
              <li>Return Policy</li>
            </ul>
          </div>
          {/* third column */}
          <div>
            <ul>
              <li className="font-semibold mb-1">SERVICES</li>
              <li>Store Offer & Events</li>
              <li>Get the iOS App</li>
              <li>Get the Android App</li>
              <li>Pay My Bill</li>
            </ul>
          </div>
        </div>
        {/* bottom section */}
        <div className="text-sm">
          <h2 className="mb-3">2023 Nostra. All Rights Reserved</h2>
          <p>Terms of Use | Privacy & Security | Report | Support</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
