// src/Routes/Routes.jsx
import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your route modules
import HomepagesRoutes from "./HomepagesRoutes";
import AdminRoutes from "./AdminRoutes";
import Gallery from "../Modules/Homepages/Pages/Gallery";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public/Homepages routes */}
        <Route path="/*" element={<HomepagesRoutes />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Redirect unknown paths to homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
