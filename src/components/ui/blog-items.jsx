"use client";
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
import Loading from "./loading";

export function BlogItem({ blog, onDelete, onEdit, mutate }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleDraftStatus = async () => {
    if (loading) return; // Prevent multiple clicks

    setLoading(true); // Start loading
    try {
      await client.patch(blog._id).set({ isDraft: !blog.isDraft }).commit();
      mutate();
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
        {/* <Button
          title={blog.isDraft ? "Publish" : "Set to Draft"}
          icon={<FaEdit />}
          size="sm"
          onClick={onEdit}
          className={`p-2 text-white rounded-md flex items-center ${
            blog.isDraft
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500 hover:bg-gray-600"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        /> */}
        <button
          onClick={toggleDraftStatus}
          className={`p-2 text-white rounded-md flex items-center ${
            blog.isDraft
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500 hover:bg-gray-600"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? <Loading /> : <FaEdit className="inline-block mr-2" />}
          {loading ? "Updating..." : blog.isDraft ? "Publish" : "Set to Draft"}
        </button>
      </CardFooter>
    </Card>
  );
}
