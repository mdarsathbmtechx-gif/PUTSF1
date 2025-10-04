// src/Modules/Homepages/Pages/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroImage =
    "https://scontent.fixm4-2.fna.fbcdn.net/v/t39.30808-6/481207307_2879094802254063_2368752196284587695_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Ph6PYt70UJQQ7kNvwEGmHOl&_nc_oc=AdmPYcCWWzzh3SJ0xFCVmynXwqU1YyGaFsDEMgvYzfieM1S4k7oY9m7J8OldcWRM_pNy5rWkCJnX53YPDtd0Dz2Y&_nc_zt=23&_nc_ht=scontent.fixm4-2.fna&_nc_gid=BGIEnfXyOb8gW0mTGpz7PQ&oh=00_Afd6G_6Xh-s-qonw5SwsAM4ugKMVZe3OPTzRHYmKGNI9ew&oe=68E699DC";

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

        {/* Right side: Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full max-w-md h-64 md:h-80 object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
