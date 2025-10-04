import React, { useState, useEffect } from "react";
import axios from "axios";

// Banner Card Component
const BannerCard = ({ banner, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(banner.title);
  const [subtitle, setSubtitle] = useState(banner.subtitle || "");

  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL; // points to /static

  const handleSave = () => {
    onUpdate(banner._id, { title, subtitle });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img
        src={`${MEDIA_URL}${banner.image}`} // always from static
        alt={banner.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded text-gray-800 focus:outline-blue-500 w-full"
            />
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="border p-2 rounded text-gray-600 focus:outline-blue-500 w-full"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 truncate">{subtitle}</p>}
            <div className="flex gap-2 mt-3 flex-wrap">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(banner._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Admin Banner Management
const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banners/`;

  // Fetch banners from backend
  const fetchBanners = async () => {
    setError("");
    try {
      const res = await axios.get(API_URL);
      setBanners(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch banners.");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Add new banner (only metadata: title, subtitle)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Please provide a title.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(API_URL, { title, subtitle });
      setTitle("");
      setSubtitle("");
      fetchBanners();
    } catch (err) {
      console.error(err);
      setError("Failed to add banner.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    setBanners((prev) => prev.filter((b) => b._id !== _id));
    try {
      await axios.delete(`${API_URL}${_id}/`);
    } catch (err) {
      console.error(err);
      setError("Failed to delete banner.");
      fetchBanners();
    }
  };

  const handleUpdate = async (_id, data) => {
    try {
      await axios.patch(`${API_URL}${_id}/`, data);
      setBanners((prev) => prev.map((b) => (b._id === _id ? { ...b, ...data } : b)));
    } catch (err) {
      console.error(err);
      setError("Failed to update banner.");
      fetchBanners();
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 md:mb-8 text-gray-800 text-center md:text-left">
        Manage Banners
      </h1>

      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

      {/* Add Banner Form */}
      <form
        onSubmit={handleAdd}
        className="mb-6 flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded-lg flex-1 w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="border p-3 rounded-lg flex-1 w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold w-full md:w-auto"
        >
          {loading ? "Adding..." : "Add Banner"}
        </button>
      </form>

      {/* Banner List */}
      {banners.length === 0 ? (
        <p className="text-gray-500 text-center">No banners found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <BannerCard
              key={banner._id}
              banner={banner}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerAdmin;
