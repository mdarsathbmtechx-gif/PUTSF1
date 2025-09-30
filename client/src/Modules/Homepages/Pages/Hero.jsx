// src/Modules/Homepages/Pages/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gray-50 text-gray-900 rounded-xl shadow-lg py-20 px-6 md:px-16 overflow-hidden">
      
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left side: Text content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empower Students. Transform Futures.
          </h1>
          <p className="text-lg md:text-xl max-w-lg mb-8">
            Independent student advocacy movement dedicated to rights, equal access, and leadership development.
          </p>

          {/* Call-to-action Buttons */}
          <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
            <Link
              to="/contact"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
            >
              Join the Movement
            </Link>
            <Link
              to="/about"
              className="border border-gray-800 text-gray-800 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right side: Placeholder for image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-md h-64 md:h-80 border-2 border-gray-300 rounded-xl shadow flex items-center justify-center text-gray-400">
            Image Placeholder
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
