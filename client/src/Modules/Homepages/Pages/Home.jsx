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
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32 py-12 space-y-24">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg shadow-xl py-32 px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fadeIn">
            Empower Students. Transform Futures.
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fadeIn">
            We are an independent student advocacy movement, dedicated to protecting rights, ensuring equal access to education, and shaping tomorrow’s leaders.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/contact"
              className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition"
            >
              Join the Movement
            </Link>
            <Link
              to="/about"
              className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-900 transition"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* About Us */}
        <section className="space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Who We Are</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transform transition">
              <FaHandsHelping className="mx-auto text-4xl text-blue-600 mb-4"/>
              <h3 className="text-xl font-semibold mb-2">Student Advocacy</h3>
              <p>Raising voices for student rights, ensuring equality, and protecting educational opportunities for all.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transform transition">
              <FaUsers className="mx-auto text-4xl text-blue-600 mb-4"/>
              <h3 className="text-xl font-semibold mb-2">Community Engagement</h3>
              <p>Building a network of students, mentors, and leaders to collaborate for meaningful reforms.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transform transition">
              <FaBullhorn className="mx-auto text-4xl text-blue-600 mb-4"/>
              <h3 className="text-xl font-semibold mb-2">Policy Influence</h3>
              <p>Engaging with policymakers to create solutions that directly impact student welfare and education policies.</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="space-y-8">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-8">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {["Workshops & Seminars", "Student Counseling", "Legal Assistance"].map((service, i) => (
              <div
                key={i}
                className="bg-blue-50 rounded-lg shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transform transition"
              >
                <h4 className="text-xl font-semibold mb-2">{service}</h4>
                <p className="text-gray-700">Providing expert guidance and practical support to empower students and strengthen their rights.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="space-y-6">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-6">Gallery Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition"
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
              className="inline-block text-blue-700 font-semibold hover:underline"
            >
              View Full Gallery
            </Link>
          </div>
        </section>

        {/* Achievements / Stats */}
        <section className="bg-white rounded-lg shadow-lg p-12 text-center space-y-6">
          <h3 className="text-4xl md:text-5xl font-bold mb-8">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-3xl font-extrabold text-blue-600 mb-2">+500</h4>
              <p className="text-gray-700">Students Supported</p>
            </div>
            <div>
              <h4 className="text-3xl font-extrabold text-blue-600 mb-2">+50</h4>
              <p className="text-gray-700">Workshops Organized</p>
            </div>
            <div>
              <h4 className="text-3xl font-extrabold text-blue-600 mb-2">+100</h4>
              <p className="text-gray-700">Policy Recommendations</p>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] rounded-lg shadow-lg animate-scaleIn"
            />
          </div>
        </div>
      )}

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
          .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
        `}
      </style>
    </main>
  );
};

export default Home;
