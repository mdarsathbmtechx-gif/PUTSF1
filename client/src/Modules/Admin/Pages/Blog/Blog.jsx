import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogAdmin = ({ userToken }) => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL + "/blog/posts/";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Token ${userToken}` },
      });
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    } else setPreviewImage(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange({ target: { files: [file] } });
  };

  const handleDragOver = (e) => e.preventDefault();

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setContent("");
    setStatus("published");
    setImageFile(null);
    setPreviewImage(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("status", status);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${userToken}`,
        },
      });
      const newBlog = res.data.post || res.data;
      setBlogs((prev) => [newBlog, ...prev]);
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blog) => {
    const blogId = String(blog._id);
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}${blogId}/`, {
        headers: { Authorization: `Token ${userToken}` },
      });
      setBlogs((prev) => prev.filter((b) => String(b._id) !== blogId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  const handleToggleStatus = async (blog) => {
    const blogId = String(blog._id);
    const newStatus = blog.status === "published" ? "draft" : "published";
    try {
      await axios.patch(
        `${API_URL}${blogId}/`,
        { status: newStatus },
        { headers: { Authorization: `Token ${userToken}` } }
      );
      setBlogs((prev) =>
        prev.map((b) => (String(b._id) === blogId ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Blog Admin Panel</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        + Create New Blog
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border p-3 rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="w-full h-40 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 cursor-pointer hover:border-blue-400 transition"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  "Drag & Drop an image here or click to select"
                )}
              </div>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                {loading ? "Uploading..." : "Create Blog"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
        {blogs.map((blog) => {
          const blogId = String(blog._id);
          const imageUrl = blog.image_url || "";
          const statusText = blog.status?.toUpperCase() || "DRAFT";

          return (
            <div
              key={blogId}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow transform hover:-translate-y-1 flex flex-col"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={blog.title || "Blog Image"}
                  className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
                />
              )}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-xl mb-1">{blog.title}</h2>
                {blog.subtitle && (
                  <p className="text-gray-600 text-sm mb-3">{blog.subtitle}</p>
                )}
                <div className="flex justify-between items-center mt-auto gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      statusText === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {statusText}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(blog)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm transition"
                    >
                      {blog.status === "published" ? "Set Draft" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(blog)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogAdmin;
