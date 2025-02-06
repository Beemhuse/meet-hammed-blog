"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import CategoryTabs from "../category-tabs";
import { Suspense } from "react";
import Card from "../card/Card";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const query =
  category && category !== "all"
    ? `*[_type == "post" && "${category}" in categories[]->slug.current]{
        _id, 
        title,
        "image": mainImage,
        "category": categories[]->title,
        slug,
        body, 
        publishedAt, 
        "author": author->name
      }`
    : `*[_type == "post"]{
        _id, 
        title,
        "image": mainImage,
        "category": categories[]->title,
        slug,
        body, 
        publishedAt, 
        "author": author->name
      }`;


  const { data: posts } = useSWR(query);
  console.log(posts)
  return (
    <div className="p-6">
      <Suspense>
        <CategoryTabs />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <Card
              key={post._id}
              {...post}
              date={post.publishedAt}
            />
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
