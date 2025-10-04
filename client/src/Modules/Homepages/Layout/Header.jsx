// src/Modules/Homepages/Layout/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/putsf-logo.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="h-[70px] w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] relative z-20">
      
      {/* Logo + Text */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={Logo}
          alt="PUTSF Logo"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
        <span className="text-indigo-600 font-bold text-sm md:text-lg lg:text-xl">
          Puducherry Union Territory Student's Federation
        </span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-10 font-medium">
        <li>
          <Link to="/" className="hover:text-gray-500/80 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:text-gray-500/80 transition">
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/blog" className="hover:text-gray-500/80 transition">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-500/80 transition">
            Contact
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        type="button"
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded active:scale-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path d="M 3 7 H 27 M 3 15 H 27 M 3 23 H 27" stroke="#000" strokeWidth="2" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white p-6 shadow-md md:hidden">
          <ul className="flex flex-col space-y-4 text-base font-medium">
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
