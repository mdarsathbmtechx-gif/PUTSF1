// src/Modules/Admin/Pages/Dashboard/Breadcrumbs.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  let paths = location.pathname.split("/").filter((x) => x);

  // Remove consecutive duplicates
  paths = paths.filter((path, index) => path !== paths[index - 1]);

  return (
    <nav className="text-gray-600 text-sm mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link to="/admin/dashboard" className="text-blue-600">
            Home
          </Link>
        </li>
        {paths.slice(1).map((path, index) => {
          const routeTo = "/" + paths.slice(0, index + 2).join("/");
          return (
            <li key={routeTo} className="flex items-center">
              <span className="mx-2">/</span>
              <Link to={routeTo} className="capitalize text-blue-600">
                {path}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
