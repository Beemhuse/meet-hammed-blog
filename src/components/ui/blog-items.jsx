"use client"
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { formatDate } from "@/utils/formatDate";
import Button from "../reusables/button";
import { FaEdit } from "react-icons/fa";
import { client } from "@/sanity/client";
import { useRouter } from "next/navigation";

export function BlogItem({ blog, onDelete, onEdit, mutate }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleDraftStatus = async () => {
    if (loading) return; // Prevent multiple clicks

    setLoading(true); // Start loading
    try {
      await client.patch(blog._id).set({ isDraft: !blog.isDraft }).commit();
mutate()
      router.refresh(); // Refresh page data
    } catch (error) {
      console.error("Error toggling draft status:", error);
    } finally {
      setLoading(false); // Stop loading after operation
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant={blog.isDraft ? "default" : "secondary"}>
          {blog.isDraft ? "Draft" : "Published"}
        </Badge>
        <p className="mt-2 text-sm text-gray-500">
          Published on: {formatDate(blog.publishedAt)}
        </p>
      </CardContent>
      <CardFooter className={"space-x-6"}>
        <Button
          title={"Delete"}
          icon={<Trash2 />}
          size="sm"
          onClick={onDelete}
          classname={"bg-red-500 p-2 text-white"}
        />
        <Button
          title={"Edit"}
          icon={<FaEdit />}
          size="sm"
          onClick={onEdit}
          classname={"bg-gray-500 p-2 text-white"}
        />
        <button
          onClick={toggleDraftStatus}
          className={`p-2 text-white rounded-md flex items-center ${
            blog.isDraft
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500 hover:bg-gray-600"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? (
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
          {loading ? "Updating..." : blog.isDraft ? "Publish" : "Set to Draft"}
        </button>
      </CardFooter>
    </Card>
  );
}
