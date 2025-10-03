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
      console.log(res.data,);
      
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
            <div key={banner._id} className="w-full relative mb-6">
              <img
                src={banner.image_url ? banner.image_url : `${MEDIA_URL}${banner.image}`}
                alt={banner.title}
                className="w-full object-contain rounded-xl shadow-lg animate-fadeZoom animate-float"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{banner.title}</h2>
                {banner.subtitle && <p className="text-lg">{banner.subtitle}</p>}
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
