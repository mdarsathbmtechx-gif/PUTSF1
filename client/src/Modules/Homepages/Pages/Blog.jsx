import React from "react";
import { Link } from "react-router-dom";

// Import local images
import blogImg1 from "../../../assets/Putsf/blog/PUTSF7.jpg";
import blogImg2 from "../../../assets/Putsf/blog/putsf8.jpg";
import blogImg3 from "../../../assets/Putsf/blog/putsf10.jpg";
import blogImg4 from "../../../assets/Putsf/blog/putsf6.jpg";

// Static blog data
const blogsData = [
  {
    id: 1,
    title: "Exploring Modern Web Design Trends",
    subtitle: "What’s trending in 2025 for web designers",
    content:
      "Web design trends in 2025 focus on accessibility, minimalism, and interactive elements. Designers are leveraging animations, AI-driven layouts, and responsive components...",
    image_url: blogImg1,
    created_at: "2025-09-15T12:00:00Z",
  },
  {
    id: 2,
    title: "Effective Digital Marketing Strategies",
    subtitle: "Boost your brand online",
    content:
      "Digital marketing strategies are evolving rapidly. Social media marketing, SEO, email campaigns, and influencer collaborations are essential for modern businesses...",
    image_url: blogImg2,
    created_at: "2025-09-10T08:30:00Z",
  },
  {
    id: 3,
    title: "The Rise of AI in Web Development",
    subtitle: "How AI tools are changing coding",
    content:
      "AI tools like code assistants and automated testing frameworks are transforming how web developers build and maintain applications, improving speed and efficiency...",
    image_url: blogImg3,
    created_at: "2025-08-28T10:15:00Z",
  },
  {
    id: 4,
    title: "Optimizing Website Performance",
    subtitle: "Tips to speed up your site",
    content:
      "Website performance is crucial for SEO and user experience. Techniques include image optimization, lazy loading, caching strategies, and efficient CSS/JS management...",
    image_url: blogImg4,
    created_at: "2025-08-20T09:00:00Z",
  },
];

const BlogHome = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
          Our Insights & Blogs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {blog.image_url && (
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h2 className="font-semibold text-2xl mb-2 text-gray-900 hover:text-blue-700 transition-colors">
                    {blog.title}
                  </h2>
                  {blog.subtitle && (
                    <p className="text-gray-600 mb-2">{blog.subtitle}</p>
                  )}
                  <p className="text-gray-700">
                    {blog.content.length > 120
                      ? blog.content.substring(0, 120) + "..."
                      : blog.content}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {blog.created_at && (
                      <span>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHome;
