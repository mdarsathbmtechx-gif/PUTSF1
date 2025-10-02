import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaFacebookF } from "react-icons/fa";

const Home = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(API_URL);

        // Ensure we always get an array
        const imgs = Array.isArray(res.data) ? res.data : res.data.images || [];
        setImages(imgs.slice(0, 4)); // preview first 4 images
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        setImages([]);
      }
    };
    fetchImages();
  }, []);

  return (
    <main className="min-h-screen font-sans bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32 py-12 space-y-24">

        {/* Gallery Preview */}
        <section className="space-y-6">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-6 text-gray-900">Gallery Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img) => (
              <div
                key={img._id} // use _id from MongoDB
                className="overflow-hidden rounded-2xl shadow-md cursor-pointer hover:scale-105 transform transition-all duration-300 border-2 border-transparent hover:border-indigo-400"
                onClick={() => setSelectedImage(img.image_url)}
              >
                <img
                  src={img.image_url || "/placeholder.png"}
                  alt={img.title || "Gallery Image"}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/gallery" className="inline-block text-indigo-700 font-semibold hover:underline">
              View Full Gallery
            </Link>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-gray-300"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
              <img src={selectedImage} alt="Preview" className="max-w-full max-h-[80vh] rounded-xl shadow-2xl animate-scaleIn" />
            </div>
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
