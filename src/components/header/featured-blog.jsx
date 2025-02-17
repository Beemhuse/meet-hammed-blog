import { urlFor } from "@/sanity/client";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import React from "react";

const FeaturedBlog = ({ blog }) => {
  return (
    <section className="mt-10">
      <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
        <Image
          src={urlFor(blog.authorImage)}
          alt={blog.title}
          width={500}
          height={500}
          className="w-full h-[50vh] object-cover"
        />
      </div>
      <div className="bg-white dark:bg-[#181A2A] shadow-xl  p-6 rounded-xl -mt-40 relative  max-w-xl m-6">
        {/* Category */}
        <span className="text-sm bg-[#4B6BFB] rounded-md px-2 py-1 text-white  capitalize">
          {blog.category}
        </span>
        {/* Title */}
        <h2 className="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white mt-2">{blog.title}</h2>
        {/* Author and Date */}
        <div className="flex items-center mt-4 text-sm text-gray-600">
          <Image
            src={urlFor(blog.authorImage)}
            alt={blog.author}
            width={500}
            height={500}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="dark:text-[#97989F]">{blog.author}</span>
          <span className="ml-4 dark:text-[#97989F]">{formatDate(blog.date)}</span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
