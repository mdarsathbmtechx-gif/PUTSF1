import React, { useState } from "react";

// Import your images statically
import Img1 from "../../../assets/Putsf/gallery/putsf1.jpg";
import Img2 from "../../../assets/Putsf/gallery/putsf2.jpg";
import Img3 from "../../../assets/Putsf/gallery/putsf3.jpg";
import Img4 from "../../../assets/Putsf/gallery/PUTSF4.jpg";
import Img5 from "../../../assets/Putsf/gallery/putsf11.jpg";
import Img6 from "../../../assets/Putsf/gallery/putsf12.jpg";
import Img7 from "../../../assets/Putsf/putsf10.jpg";

const imagesData = [
  { id: 1, title: "Image 1", image_url: Img1 },
  { id: 2, title: "Image 2", image_url: Img2 },
  { id: 3, title: "Image 3", image_url: Img3 },
  { id: 4, title: "Image 4", image_url: Img4 },
  { id: 5, title: "Image 5", image_url: Img5 },
  { id: 6, title: "Image 6", image_url: Img6 },
  { id: 7, title: "Image 7", image_url: Img7 },
];

const HomeGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? imagesData.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === imagesData.length - 1 ? 0 : prev + 1));

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-gray-900">
          Gallery
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imagesData.map((img, index) => (
            <div
              key={img.id}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-60 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h2 className="text-white font-semibold text-lg md:text-xl p-2 text-center">
                  {img.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-gray-300"
            >
              &times;
            </button>

            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300"
            >
              &#8249;
            </button>

            <div className="max-w-4xl max-h-full mx-auto p-4 flex flex-col items-center">
              <img
                src={imagesData[currentIndex].image_url}
                alt={imagesData[currentIndex].title}
                className="w-full h-full object-contain rounded-lg shadow-xl"
              />
              <p className="text-white mt-4 font-semibold text-lg md:text-xl text-center">
                {imagesData[currentIndex].title}
              </p>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300"
            >
              &#8250;
            </button>

            {/* Thumbnail strip */}
            <div className="flex space-x-3 overflow-x-auto mt-8 max-w-full py-2">
              {imagesData.map((img, index) => (
                <img
                  key={img.id}
                  src={img.image_url}
                  alt={img.title}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer border-2 ${
                    currentIndex === index
                      ? "border-indigo-500"
                      : "border-transparent"
                  } hover:border-indigo-400 transition`}
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
