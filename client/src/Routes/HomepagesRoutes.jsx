// src/Routes/HomepagesRoutes.jsx
import React from "react";
import Home from "../Modules/Homepages/Pages/Home";
import Banner from "../Modules/Homepages/Layout/Banner";
import BlogHome from "../Modules/Homepages/Pages/Blog";
import Hero from "../Modules/Homepages/Pages/Hero";
import SocialMediaLinks from "../Modules/Homepages/Pages/SocialMediaLinks";
import License from "../Modules/Homepages/Pages/License"; // ✅ Add this import
import LicenseDownload from "../Modules/Homepages/Pages/LicenseDownload";

const HomepagesRoutes = () => {
  return (
    <>
      <Banner />
      <Hero />
      <Home />
      <SocialMediaLinks />
      <BlogHome />
      <LicenseDownload />
    </>
  );
};

export default HomepagesRoutes;
