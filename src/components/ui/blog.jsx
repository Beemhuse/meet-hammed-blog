"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import CategoryTabs from "../category-tabs";
import { Suspense } from "react";
import Card from "../card/Card";
import { PublicEmptyState } from "./public-empty-state";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const query =
  category && category !== "all"
    ? `*[_type == "post" && isDraft == false && "${category}" in categories[]->slug.current]{
        _id, 
        title,
        "image": mainImage,
        "category": categories[]->title,
        slug,
        body, 
        publishedAt, 
        "author": author->name
      }`
    : `*[_type == "post" && isDraft == false]{
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
  return (
    <div className="p-6">
      <Suspense>
        <CategoryTabs />
      </Suspense>
        {posts?.length > 0 ? 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
         { posts?.map((post) => (
            <Card
              key={post._id}
              {...post}
              date={post.publishedAt}
            />
          ))}
      </div>
      : (
          <PublicEmptyState />
        )}
    </div>
  );
}
