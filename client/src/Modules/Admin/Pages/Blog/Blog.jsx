
import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogAdmin = ({ userToken }) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published"); // default to published
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL + "/blog/posts/";

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Token ${userToken}` },
      });
      if (Array.isArray(res.data)) setBlogs(res.data);
      else setBlogs([]);
    } catch (err) {
      console.error("Failed to fetch blogs:", err.response || err);
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    } else setPreviewImage(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !content || !imageFile)
      return alert("Title, content, and image are required");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("status", status);
    formData.append("image", imageFile);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${userToken}`,
        },
      });
      const newBlog = res.data.post || res.data; // backend may return { post } or direct object
      setBlogs((prev) => [newBlog, ...prev]);
      setTitle("");
      setSubtitle("");
      setContent("");
      setStatus("published");
      setImageFile(null);
      setPreviewImage(null);
      alert("Blog created successfully!");
    } catch (err) {
      console.error("Failed to create blog:", err.response?.data || err);
      alert("Failed to create blog. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blog) => {
    const blogId = String(blog._id);
    if (!blogId) return alert("Blog ID not found");
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${API_URL}${blogId}/`, {
        headers: { Authorization: `Token ${userToken}` },
      });
      setBlogs((prev) => prev.filter((b) => String(b._id) !== blogId));
    } catch (err) {
      console.error("Failed to delete blog:", err.response || err);
      alert("Failed to delete blog.");
    }
  };

  const handleToggleStatus = async (blog) => {
    const blogId = String(blog._id);
    if (!blogId) return;

    const newStatus = blog.status === "published" ? "draft" : "published";
    try {
      await axios.patch(
        `${API_URL}${blogId}/`,
        { status: newStatus },
        { headers: { Authorization: `Token ${userToken}` } }
      );
      setBlogs((prev) =>
        prev.map((b) =>
          String(b._id) === blogId ? { ...b, status: newStatus } : b
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err.response || err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold text-gray-800">Blog Admin Panel</h1>

      <form
        onSubmit={handleCreate}
        className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-start md:items-center flex-wrap"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[200px]"
          required
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[200px] h-24 md:h-32"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 rounded"
          required
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-24 object-cover rounded border mt-2 md:mt-0"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Create Blog"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => {
          const blogId = String(blog._id);
          const imageUrl = blog.image_url || blog.image || "";
          const subtitleText = blog.subtitle || "";
          const statusText = blog.status ? blog.status.toUpperCase() : "DRAFT";

          return (
            <div
              key={blogId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow relative flex flex-col"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={blog.title || "Blog Image"}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              )}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-lg mb-1">
                  {blog.title || "Untitled Blog"}
                </h2>
                {subtitleText && (
                  <p className="text-gray-600 text-sm mb-2">{subtitleText}</p>
                )}
                <div className="flex justify-between items-center mt-auto space-x-2">
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
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                    >
                      {blog.status === "published" ? "Set Draft" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(blog)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
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