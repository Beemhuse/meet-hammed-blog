"use client"
import Card from "@/components/card/Card";
import CategoryTabs from "@/components/category-tabs";
// import { client } from "@/sanity/client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  
  const query = category && category !== "all"
  ? `*[_type == "post" && categories[]->slug.current == "${category}"]`
  : `*[_type == "post"]`;
  
  const {data: posts} = useSWR(query)
  // const posts = await client.fetch(query);
console.log(posts)
  return (
    <div className="p-6">
      <CategoryTabs />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <Card
            key={post._id}
            image={post.image}
            category={post.categories}
            title={post.title}
            author={post.author}
            date={post.publishedAt}
            slug={post.slug}
            authorImage={post.authorImage}
          />
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
