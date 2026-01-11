import React from "react";
import { Link } from "react-router-dom";

const posts = [
  { id: 1, title: "Top 10 Travel Tips", image: "/blog1.jpg" },
  { id: 2, title: "How to Book Cheap Tickets", image: "/blog2.jpg" },
  { id: 3, title: "Best Destinations in Bangladesh", image: "/blog3.jpg" },
];

const Blog = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-base-100 dark:bg-base-200 transition-colors duration-500 w-full">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-black dark:text-[#FDDB1A]">
        Latest Blogs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7x3 mx-auto">
        {posts.map((p) => (
          <Link key={p.id} to={`/blog/${p.id}`}>
            <div
              className="rounded-2xl overflow-hidden shadow-md dark:shadow-gray-700
                hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer
                bg-white dark:bg-[#2C2C2C]"
            >
              {/* Blog Image */}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-56 md:h-48 object-cover transition-transform duration-700 ease-out hover:scale-110"
              />

              {/* Blog Title */}
              <div className="p-6 font-semibold text-lg md:text-xl text-black dark:text-white">
                {p.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blog;
