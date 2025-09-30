// src/Modules/Admin/Layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/banner", label: "Banner" },
    { to: "/admin/gallery", label: "Gallery" },
    { to: "/admin/blogs", label: "Blogs" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-4">
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
