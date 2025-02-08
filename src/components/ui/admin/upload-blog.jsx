"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic"; // Dynamic import for React Quill
import { client } from "@/sanity/client";
import { FaEdit } from "react-icons/fa";
const TextEditor = dynamic(() => import("./text-editor"), { ssr: false });

export default function BlogUploadPage({ cat }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const editorRef = useRef(null);
  const [statusLoading, setStatusLoading] = useState(false);

  console.log(cat);
  // Fetch categories from Sanity
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Handle file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const editorContent = editorRef.current?.getContents();

    // Convert content to Portable Text format
    const portableTextContent = [
      {
        _type: "block",
        children: [{ _type: "span", text: editorContent }],
      },
    ];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", JSON.stringify(portableTextContent));
    formData.append("categories", JSON.stringify(selectedCategories));
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);
      setMessage(data.message || "Blog uploaded successfully!");

      // Reset form
      setTitle("");
      //   editorRef.current?.getContents().ops = []; // Clear the editor

      setContent("");
      setSelectedCategories([]);
      setImage(null);
    } catch (error) {
      console.error("Error uploading blog:", error);
      setLoading(false);
      setMessage("Failed to upload blog. Try again.");
    }
  };
  console.log(content);

  const toggleDraftStatus = async () => {
    if (loading) return; // Prevent multiple clicks

    setLoading(true); // Start loading
    try {
      // await client.patch(blog._id).set({ isDraft: !blog.isDraft }).commit();
      // mutate();
      router.refresh(); // Refresh page data
    } catch (error) {
      console.error("Error toggling draft status:", error);
    } finally {
      setLoading(false); // Stop loading after operation
    }
  };
  return (
    <section>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Upload Blog Article</h2>

        {message && <p className="text-green-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <TextEditor ref={editorRef} />

          <div>
            <label className="font-semibold">Categories:</label>
            <select
              id="category"
              // multiple
              value={selectedCategories}
              onChange={(e) =>
                setSelectedCategories(
                  [...e.target.selectedOptions].map((opt) => opt.value)
                )
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {cat?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <input type="file" onChange={handleImageChange} />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="">
        <button
          onClick={toggleDraftStatus}
          // className={`p-2 text-white rounded-md flex items-center ${
          //   blog.isDraft
          //     ? "bg-green-500 hover:bg-green-600"
          //     : "bg-gray-500 hover:bg-gray-600"
          // } ${statusLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={statusLoading}
        >
          {statusLoading ? (
            <svg
              className="w-4 h-4 mr-2 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            <FaEdit className="inline-block mr-2" />
          )}
          {/* {statusLoading ? "Updating..." : blog.isDraft ? "Publish" : "Set to Draft"} */}
        </button>
      </div>
    </section>
  );
}
