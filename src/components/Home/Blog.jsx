import React from "react";
import { Link } from "react-router-dom";

const posts = [
  { id: 1, title: "Top 10 Travel Tips", image: "/images/blog1.jpg" },
  { id: 2, title: "How to Book Cheap Tickets", image: "/images/blog2.jpg" },
  { id: 3, title: "Best Destinations in Bangladesh", image: "/images/blog3.jpg" },
];

const Blog = () => {
  return (
    <section className="py-16 px-4 md:px-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(p => (
          <Link key={p.id} to={`/blog/${p.id}`}>
            <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
              <img src={p.image} alt={p.title} className="w-full h-48 object-cover"/>
              <div className="p-4 font-semibold">{p.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blog;
