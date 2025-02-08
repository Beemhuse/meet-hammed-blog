import ViewBlogs from "@/components/ui/admin/view-blogs";
import { client } from "@/sanity/client";
import { options, POSTS_QUERY } from "@/sanity/queries";
import React from "react";
// import useSWR from "swr";

export default async function page() {
//   const posts = await client.fetch(POSTS_QUERY, {}, options);
// console.log(posts)
// function refresh(){
//   return client.fetch(POSTS_QUERY, {}, options);
// }
  return (
    <div>
      <ViewBlogs  />
    </div>
  );
}
