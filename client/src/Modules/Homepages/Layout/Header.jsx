// src/Modules/Homepages/Layout/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      {/* Logo / Organization Name */}
      <Link to="/" className="text-indigo-600 font-bold text-lg md:text-xl">
        Puducherry Union Territory Student's Federation
      </Link>

      {/* Desktop Menu */}
      <ul className="md:flex hidden items-center gap-10 font-medium">
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
        className="menu-btn inline-block md:hidden active:scale-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#000"
        >
          <path d="M 3 7 H 27 M 3 15 H 27 M 3 23 H 27" stroke="#000" strokeWidth="2" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white p-6 md:hidden shadow-md">
          <ul className="flex flex-col space-y-4 text-lg font-medium">
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
