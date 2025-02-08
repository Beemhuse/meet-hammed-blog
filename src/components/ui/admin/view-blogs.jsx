"use client";

import { useState } from "react";
import { BlogItem } from "../blog-items";

// Dummy data for blogs
const blogs = [
  { id: 1, title: "Getting Started with Next.js", status: "published", date: "2023-05-15" },
  { id: 2, title: "React Server Components Explained", status: "draft", date: "2023-05-20" },
  { id: 3, title: "Building a Blog with Next.js and Markdown", status: "published", date: "2023-05-25" },
];

function CustomTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mb-4 flex space-x-4 border-b pb-2">
      <button className={`px-4 py-2 ${activeTab === "all" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setActiveTab("all")}>All</button>
      <button className={`px-4 py-2 ${activeTab === "draft" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setActiveTab("draft")}>Draft</button>
      <button className={`px-4 py-2 ${activeTab === "published" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setActiveTab("published")}>Published</button>
    </div>
  );
}

export default function ViewBlogs({posts}) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts = posts?.filter((blog) => {
    if (activeTab === "all") return true;
    return activeTab === "draft" ? blog.isDraft : !blog.isDraft;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      
      <CustomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="space-y-4">
        {filteredPosts?.length > 0 ? (
          filteredPosts.map((post) => <BlogItem key={post._id} blog={post} />)
        ) : (
          <p className="text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
