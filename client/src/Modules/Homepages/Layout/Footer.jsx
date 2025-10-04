// src/Modules/Homepages/Layout/Footer.jsx
import React from "react";
import Logo from "../../../assets/bm techx logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto flex flex-col items-center gap-4">
        {/* Logo and Brand Name */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={Logo}
            alt="BM Techx Logo"
            className="w-16 h-16 object-contain"
          />
          <span className="text-xl font-semibold tracking-wide">BM Techx</span>
        </div>

        {/* Copyright Text */}
        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Putsf. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
