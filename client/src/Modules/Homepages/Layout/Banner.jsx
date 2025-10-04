import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banners/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  const fetchBanners = async () => {
    try {
      const res = await axios.get(API_URL);
      setBanners(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch banners:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <section className="w-full relative pt-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div
              key={banner._id}
              className="relative mb-6 w-full overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={banner.image_url ? banner.image_url : `${MEDIA_URL}${banner.image}`}
                alt={banner.title}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-black/40 p-4 rounded-md max-w-[90%] md:max-w-[60%] lg:max-w-[50%]">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {banner.title}
                </h2>
                {banner.subtitle && (
                  <p className="text-sm md:text-lg lg:text-xl text-white mt-1">
                    {banner.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No banners available</p>
        )}
      </div>
    </section>
  );
};

export default Banner;
