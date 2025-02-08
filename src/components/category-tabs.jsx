"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/sanity/client";

export default function CategoryTabs() {
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") || "all";

  useEffect(() => {
    async function fetchCategories() {
      const query = `*[_type == "category"]{_id, title, slug }`;
      const data = await client.fetch(query);
      console.log(data);
      setCategories([{ title: "All", slug: { current: "all" } }, ...data]);
    }
    fetchCategories();
  }, []);
  const handleCategoryClick = (slug) => {
    // Ensure "All" category sets a valid URL
    router.push(slug === "all" ? "/blog?category=all" : `/blog?category=${slug}`);
  };
  console.log(categories);
  return (
    <div className="flex space-x-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
      {categories?.map((category) => (
        <button
          key={category?.title}
          onClick={() => handleCategoryClick(category?.slug?.current)}
          className={`px-4 py-2 rounded-full transition ${
            activeCategory === category?.slug?.current
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
