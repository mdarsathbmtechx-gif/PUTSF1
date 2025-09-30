// src/Modules/Homepages/Pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHandsHelping, FaUsers, FaBullhorn } from "react-icons/fa";

const Home = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(API_URL);
        setImages(res.data.slice(0, 4)); // preview first 4 images
      } catch (err) {
        console.error("Error fetching gallery images:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <main className="min-h-screen font-sans bg-gray-50 text-gray-900">

      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32 py-12 space-y-24">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-900 via-purple-700 to-pink-600 text-white rounded-3xl shadow-2xl py-28 px-6 md:px-16 text-center overflow-hidden">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fadeIn">
            Empower Students. Transform Futures.
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fadeIn">
            Independent student advocacy movement dedicated to rights, equal access, and leadership development.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              to="/contact"
              className="bg-white text-indigo-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              Join the Movement
            </Link>
            <Link
              to="/about"
              className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-900 transition transform hover:-translate-y-1"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* About Us */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-900">Who We Are</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHandsHelping className="mx-auto text-4xl text-indigo-600 mb-4"/>,
                title: "Student Advocacy",
                desc: "Raising voices for student rights, ensuring equality, and protecting educational opportunities."
              },
              {
                icon: <FaUsers className="mx-auto text-4xl text-indigo-600 mb-4"/>,
                title: "Community Engagement",
                desc: "Building networks of students, mentors, and leaders to collaborate for meaningful reforms."
              },
              {
                icon: <FaBullhorn className="mx-auto text-4xl text-indigo-600 mb-4"/>,
                title: "Policy Influence",
                desc: "Engaging with policymakers to create impactful solutions for student welfare."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition-all duration-300"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="space-y-8">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-900">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["Workshops & Seminars", "Student Counseling", "Legal Assistance"].map((service, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              >
                <h4 className="text-xl font-semibold mb-2">{service}</h4>
                <p className="text-gray-700">Providing guidance and practical support to empower students and strengthen their rights.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="space-y-6">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-6 text-gray-900">Gallery Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-2xl shadow-md cursor-pointer hover:scale-105 transform transition-all duration-300"
                onClick={() => setSelectedImage(img.image_url)}
              >
                <img
                  src={img.image_url || "/placeholder.png"}
                  alt={img.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-block text-indigo-700 font-semibold hover:underline"
            >
              View Full Gallery
            </Link>
          </div>
        </section>

        {/* Achievements / Stats */}
        <section className="bg-white rounded-3xl shadow-xl p-12 text-center space-y-6">
          <h3 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "+500", label: "Students Supported" },
              { number: "+50", label: "Workshops Organized" },
              { number: "+100", label: "Policy Recommendations" }
            ].map((item, i) => (
              <div key={i}>
                <h4 className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-2">{item.number}</h4>
                <p className="text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

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
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] rounded-xl shadow-2xl animate-scaleIn"
            />
          </div>
        </div>
      )}

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
