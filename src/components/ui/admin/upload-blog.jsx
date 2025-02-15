"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic"; // Dynamic import for React Quill
// import { client } from "@/sanity/client";
import { FaEdit } from "react-icons/fa";
import { Cookies } from "react-cookie";
import { uploadImageToSanity } from "@/utils/uploadImageToSanity";
const TextEditor = dynamic(() => import("./text-editor"), { ssr: false });
const convertDeltaToPortableText = (delta) => {
  if (!delta || !delta.ops) return []; // Handle empty content

  const portableText = [];

  delta.ops.forEach((op) => {
    if (op.insert && typeof op.insert === 'string') {
      // Handle text content
      portableText.push({
        _type: 'block',
        style: 'normal', // Default style
        children: [{ _type: 'span', text: op.insert }], // Ensure text is a string
      });
    }
    if (op.insert && typeof op.insert === 'object' && op.insert.image) {
      // Handle images
      portableText.push({
        _type: 'image',
        asset: { _type: 'reference', _ref: op.insert.image }, // Reference to the image asset
      });
    }
  });

  return portableText;
};
// const convertDeltaToPortableText = (delta) => {
//   if (!delta || !delta.ops) return []; // Handle empty content

//   const portableText = [];

//   delta.ops.forEach((op) => {
//     if (op.insert) {
//       // Handle text content
//       portableText.push({
//         _type: "block",
//         style: "normal", // Default style, customize as needed
//         children: [
//           {
//             _type: "span",
//             text: op.insert,
//           },
//         ],
//       });
//     }
//     // Handle other Delta operations (e.g., images, links, etc.)
//     if (op.insert && typeof op.insert === "object" && op.insert.image) {
//       // Handle images
//       portableText.push({
//         _type: "image",
//         asset: {
//           _type: "reference",
//           _ref: op.insert.image, // Assuming this is the image reference
//         },
//       });
//     }
//   });

//   return portableText;
// };
export default function BlogUploadPage({ cat }) {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [categories, setCategories] = useState([]);
  const [body, setBody] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const cookie = new Cookies();
  const authorId = cookie.get("mb-id");

  // console.log(cat[0]._id)
  // Handle file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
// console.log(editorRef.current?.getContents())
  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  console.log(selectedCategories.join(""), authorId);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (editorRef.current) {
      const delta = editorRef.current.getContents(); // Get Delta object
      const html = editorRef.current.getHTML(); // Get HTML (optional)
      console.log("Delta:", delta);
      console.log("HTML:", html);
    }
    // Get content from editor
    const editorContent = editorRef.current?.getContents();
    let imageAssetId = "";
    // Convert content to Sanity block format
    const portableTextContent = convertDeltaToPortableText(editorContent);
    console.log(portableTextContent)

  
    // Upload image if available
    if (image) {
      imageAssetId = await uploadImageToSanity(image);
    }
  
    // Create JSON payload
    const postData = {
      title,
      content: portableTextContent, // ✅ Properly formatted blockContent
      authorId,
      categories: selectedCategories,
      mainImage: imageAssetId
        ? {
            _type: "image",
            asset: { _type: "reference", _ref: imageAssetId },
          }
        : null,
    };
  
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
  
      const data = await res.json();
      setLoading(false);
      setMessage(data.message || "Blog uploaded successfully!");
  
      // Reset form
      setTitle("");
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
    <section className="grid grid-cols-3 items-center ">
      <div className=" w-full p-6 col-span-2 bg-white ">
        <h2 className="text-2xl font-bold mb-4">Upload Blog Article</h2>

        {message && <p className="text-green-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="file" onChange={handleImageChange} />

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <TextEditor ref={editorRef} defaultValue={{ ops: [{ insert: "Hello, world!\n" }] }}  />

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
