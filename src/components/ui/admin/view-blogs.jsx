"use client";

import { useState } from "react";
import { BlogItem } from "../blog-items";
import { client } from "@/sanity/client";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { POSTS_QUERY } from "@/sanity/queries";

// Dummy data for blogs
const blogs = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    status: "published",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "React Server Components Explained",
    status: "draft",
    date: "2023-05-20",
  },
  {
    id: 3,
    title: "Building a Blog with Next.js and Markdown",
    status: "published",
    date: "2023-05-25",
  },
];

function CustomTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mb-4 flex space-x-4 border-b pb-2">
      <button
        className={`px-4 py-2 ${activeTab === "all" ? "border-b-2 border-blue-500" : ""}`}
        onClick={() => setActiveTab("all")}
      >
        All
      </button>
      <button
        className={`px-4 py-2 ${activeTab === "draft" ? "border-b-2 border-blue-500" : ""}`}
        onClick={() => setActiveTab("draft")}
      >
        Draft
      </button>
      <button
        className={`px-4 py-2 ${activeTab === "published" ? "border-b-2 border-blue-500" : ""}`}
        onClick={() => setActiveTab("published")}
      >
        Published
      </button>
    </div>
  );
}

export default function ViewBlogs() {
  const { data: posts, mutate } = useSWR(POSTS_QUERY);

  const router = useRouter(); // Initialize Next.js router

  const [activeTab, setActiveTab] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [openDraftModal, setOpenDraftModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleActionClick = (post, type) => {
    setSelectedPost(post);
    type === "delete" ? setOpenModal(true) : setOpenDraftModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedPost) return;

    try {
      await client.delete(selectedPost._id);
      mutate();

      setOpenModal(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  const confirmSetDraft = async () => {
    if (!selectedPost) return;

    try {
      await client.patch(selectedPost._id).set({ isDraft: true }).commit();
      setOpenDraftModal(false);
      mutate();

      router.refresh();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
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
          filteredPosts.map((post) => (
            <BlogItem
              key={post._id}
              blog={post}
              onDelete={() => handleActionClick(post, "delete")}
              onEdit={() => handleActionClick(post, "draft")}
              mutate={mutate}
            />
          ))
        ) : (
          <p className="text-gray-500">No blogs found.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-gray-700 mt-2">
              Are you sure you want to delete{" "}
              <strong>{selectedPost?.title}</strong>?
            </p>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Set to Draft Confirmation Modal */}
      {openDraftModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold">Confirm Draft Status</h2>
            <p className="text-gray-700 mt-2">
              Are you sure you want to set{" "}
              <strong>{selectedPost?.title}</strong> to draft?
            </p>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setOpenDraftModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmSetDraft}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Set to Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
