import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  // Fetch all images
  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err.response || err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else setPreview(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Provide title and image");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setFile(null);
      setPreview(null);
      fetchImages();
    } catch (err) {
      console.error("Upload error:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (mongoId) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`${API_URL}${mongoId}/`);
      fetchImages();
    } catch (err) {
      console.error("Delete error:", err.response || err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Gallery</h1>

      <form onSubmit={handleUpload} className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {preview && <img src={preview} alt="Preview" className="w-48 h-48 object-cover mb-6" />}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img._id} className="border rounded overflow-hidden relative">
            <img src={img.image_url} alt={img.title} className="w-full h-48 object-cover" />
            <div className="p-2 flex justify-between items-center">
              <h2 className="font-semibold">{img.title}</h2>
              <button
                onClick={() => handleDelete(img._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
