import React from "react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative pt-20 ">

      {/* Images */}
      <img
        src="/headset.jpg"
        alt=""
        className="w-full h-[581px] object-cover hidden md:block"
      />
      <img
        src="/banner small.jpg"
        alt=""
        className="w-full h-[500px] object-cover md:hidden"
      />

      {/* Overlay Content */}
  <div className="absolute inset-0 flex flex-col justify-center md:justify-start md:pt-64 px-6 md:px-16 text-white">

  <h1 className="text-3xl md:text-6xl font-bold mb-4 max-w-xl">
    Upgrade Your Tech Life
  </h1>

  <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-md mt-2 md:mt-6">
    Premium Headphones & Smart Gadgets <br/>at Best Prices
  </p>

  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
    <Link
      to="/products"
      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
    >
      Shop Now
    </Link>

          <Link
            to="/products"
            className="group relative text-blue-300 font-semibold transition duration-300"
          >
            <span className="relative z-10 group-hover:text-blue-700 transition">
              Explore Deals →
            </span>

            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
  </div>

</div>
    </div>
  );
};

export default MainBanner;