import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../../assets/PutsfHero.jpg"; // ✅ Local image import

const Hero = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          
          {/* Left side: Text */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-6 leading-tight">
              Empower Students. Transform Futures.
            </h1>
            <p className="text-lg md:text-xl max-w-lg mb-8 text-gray-700">
              Independent student advocacy movement dedicated to rights, equal access, and leadership development.
            </p>

            {/* Call-to-action Buttons */}
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4 w-full md:w-auto">
              {/* ✅ Updated to navigate to /license like “Join Us” button */}
              <Link
                to="/license"
                className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
              >
                Join the Movement
              </Link>

              <Link
                to="/about"
                className="border border-indigo-600 text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-indigo-50 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="w-full max-w-md md:max-w-lg overflow-hidden rounded-xl shadow-lg">
              <img
                src={HeroImage}
                alt="Hero"
                className="w-full h-auto object-contain md:object-scale-down"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
