"use client"
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
            <div key={post._id} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <h2 className="text-lg font-semibold">{post.title}</h2>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
