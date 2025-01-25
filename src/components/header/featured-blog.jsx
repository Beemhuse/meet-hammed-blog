import React from "react";

const FeaturedBlog = ({ blog }) => {
  return (
    <section className="mt-10">
      <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[50vh] object-cover"
        />
      </div>
      <div className="bg-white shadow-xl  p-6 rounded-xl -mt-20 relative  max-w-xl m-6">
        {/* Category */}
        <span className="text-sm bg-[#4B6BFB] rounded-md px-2 py-1 text-white  capitalize">
          {blog.category}
        </span>
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 mt-2">{blog.title}</h2>
        {/* Author and Date */}
        <div className="flex items-center mt-4 text-sm text-gray-600">
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>{blog.author}</span>
          <span className="ml-4">{blog.date}</span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
