// src/Modules/Homepages/Layout/Banner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banners/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data && res.data.length > 0) {
          // show the latest banner (you can change to [0] if you want first one)
          setBanner(res.data[res.data.length - 1]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load banner.");
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  if (loading) {
    return (
      <section className="w-full pt-24 bg-white text-center py-12">
        <p className="text-gray-500">Loading banner...</p>
      </section>
    );
  }

  if (error || !banner) {
    return (
      <section className="w-full pt-24 bg-white text-center py-12">
        <p className="text-gray-500">No banner available.</p>
      </section>
    );
  }

  const imageSrc = banner.image_url
    ? banner.image_url
    : `${MEDIA_URL}${banner.image}`;

  return (
    <section className="w-full relative pt-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="relative mb-6 w-full overflow-hidden rounded-xl shadow-xl">
          {/* Dynamic Banner Image */}
          <img
            src={imageSrc}
            alt={banner.title}
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent rounded-xl"></div>

          {/* Text Content */}
          <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 text-white max-w-[90%] md:max-w-[60%] lg:max-w-[50%]">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 opacity-0 animate-fadeInUp delay-100">
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p className="text-sm md:text-lg lg:text-xl opacity-0 animate-fadeInUp delay-200">
                {banner.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s forwards;
          }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
        `}
      </style>
    </section>
  );
};

export default Banner;
