import React, { useState } from "react";
import { Link } from "react-router-dom";
import Img1 from "../../../assets/Putsf/gallery/putsf1.jpg";
import Img2 from "../../../assets/Putsf/gallery/putsf2.jpg";
import Img3 from "../../../assets/Putsf/gallery/putsf3.jpg";
import Img4 from "../../../assets/Putsf/gallery/PUTSF4.jpg";

const imagesData = [
  { id: 1, title: "Image 1", image_url: Img1 },
  { id: 2, title: "Image 2", image_url: Img2 },
  { id: 3, title: "Image 3", image_url: Img3 },
  { id: 4, title: "Image 4", image_url: Img4 },
];

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <main className="font-sans bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32 py-12">

        {/* Gallery Preview */}
        <section className="space-y-6">
  <h3 className="text-3xl md:text-5xl font-bold text-center text-indigo-600">
    Gallery Preview
  </h3>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {imagesData.map((img) => (
              <div
                key={img.id}
                className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-indigo-400"
                onClick={() => setSelectedImage(img.image_url)}
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-48 md:h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 text-white text-center py-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {img.title}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/gallery"
              className="inline-block px-6 py-2 text-indigo-700 font-semibold border border-indigo-700 rounded-full hover:bg-indigo-700 hover:text-white transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full rounded-xl shadow-2xl animate-scaleIn"
            />
          </div>
        )}
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .animate-fadeIn { animation: fadeIn 0.35s ease-out forwards; }
          .animate-scaleIn { animation: scaleIn 0.35s ease-out forwards; }
        `}
      </style>
    </main>
  );
};

export default Home;
