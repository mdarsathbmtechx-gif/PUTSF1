import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeGallery = () => {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Gallery
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={img.image_url || "/placeholder.png"}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white text-center">
                <h2 className="font-semibold text-lg text-gray-800">
                  {img.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90 p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
            >
              &times;
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:text-gray-300"
            >
              &#8249;
            </button>

            <div className="max-w-4xl max-h-full mx-auto p-4">
              <img
                src={images[currentIndex].image_url || "/placeholder.png"}
                alt={images[currentIndex].title}
                className="w-full h-full object-contain rounded"
              />
              <p className="text-center text-white mt-4 font-semibold">
                {images[currentIndex].title}
              </p>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:text-gray-300"
            >
              &#8250;
            </button>

            {/* Thumbnail strip */}
            <div className="flex space-x-2 overflow-x-auto mt-6 max-w-full py-2">
              {images.map((img, index) => (
                <img
                  key={img.id}
                  src={img.image_url || "/placeholder.png"}
                  alt={img.title}
                  className={`h-20 w-20 object-cover rounded cursor-pointer border-2 ${
                    currentIndex === index
                      ? "border-indigo-600"
                      : "border-transparent"
                  } hover:border-indigo-400`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeGallery;
