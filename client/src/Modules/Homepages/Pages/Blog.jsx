import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = Array.isArray(res.data) ? res.data : [];
      const publishedBlogs = data.filter((b) => b.status === "published");
      setBlogs(publishedBlogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err.response || err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return null;
    return imgPath.startsWith("http") ? imgPath : `${MEDIA_URL}${imgPath}`;
  };

  if (loading) {
    return (
      <section className="w-full py-16 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
          Our Insights & Blogs
        </h1>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const blogId =
                typeof blog._id === "object" ? blog._id.$oid : String(blog._id);
              const imageUrl = getImageUrl(blog.image_url || blog.image);

              return (
                <div
                  key={blogId}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={blog.title}
                      className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <h2 className="font-semibold text-2xl mb-2 text-gray-900 hover:text-blue-700 transition-colors">
                        {blog.title || "Untitled Blog"}
                      </h2>
                      {blog.subtitle && (
                        <p className="text-gray-600 mb-2">{blog.subtitle}</p>
                      )}
                      <p className="text-gray-700">
                        {blog.content && blog.content.length > 120
                          ? blog.content.substring(0, 120) + "..."
                          : blog.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        {blog.author && <span>By {blog.author}</span>}
                        {blog.created_at && (
                          <span>
                            {" "}
                            •{" "}
                            {new Date(blog.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/blog/${blogId}`}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-12">
            No blogs available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogHome;

