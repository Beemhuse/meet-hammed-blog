"use client"
import { urlFor } from "@/sanity/client";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Card = ({ image, category, title, author, date, slug }) => {
  const { push } = useRouter();
  return (

    <div
      onClick={() => push(`blog/${slug.current}`)}
      className="max-w-sm cursor-pointer border p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transform transition-transform duration-300 group hover:scale-105 hover:shadow-lg"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={image? urlFor(image): null}
          alt={title}
          height={100}
          width={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
          {category}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600">
          {title}
        </h3>
      </div>

      {/* Footer Section */}
      <div className="px-4 pb-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
        {/* Author */}
        <div className="flex items-center space-x-2">
          <Image
            src={image? urlFor(image): null}
            alt={author}
            height={100}
            width={300}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm">{author}</span>
        </div>

        {/* Date */}
        <span className="text-sm">{formatDate(date)}</span>
      </div>
    </div>
  );
};

export default Card;
