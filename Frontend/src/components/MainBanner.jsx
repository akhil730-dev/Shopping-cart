import React from "react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-8">
      
      {/* CARD-STYLE BANNER */}
      <div 
        className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-black"
        style={{
          backgroundImage: `url('/headset.jpg')`,
          backgroundPosition: 'center right',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Gradient Overlay - from left to right for text area */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

        {/* CONTENT */}
        <div className="relative h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 text-white">

          {/* Main Heading */}
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Upgrade Your <br /> Tech Life
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              Premium Headphones & Smart Gadgets <br /> at Best Prices
            </p>

            {/* CTA Button */}
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold border border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl w-fit"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;