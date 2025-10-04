import React from "react";

// Import your static banner image
import BannerImg from "../../../assets/banner/PutsfBanner.jpg";

const Banner = () => {
  return (
    <section className="w-full relative pt-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="relative mb-6 w-full overflow-hidden rounded-xl shadow-lg">
          <img
            src={BannerImg}
            alt="Putsf Banner"
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 bg-black/40 p-4 rounded-md max-w-[90%] md:max-w-[60%] lg:max-w-[50%]">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Welcome to Putsf
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-white mt-1">
              Discover our gallery and latest updates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
