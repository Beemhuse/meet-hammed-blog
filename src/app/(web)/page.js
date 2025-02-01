import Card from "@/components/card/Card";
import FeaturedBlog from "@/components/header/featured-blog";
import RollingGallery from "@/components/rolling-gallery";
import { client } from "@/sanity/client";
import { options, POSTS_QUERY } from "@/sanity/queries";

const featuredBlogData = {
  "image": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  category: "Technology",
  title: "The Impact of Technology on the Workplace: How Technology is Changing",
  author: "Jason Francisco",
  authorImage: "https://via.placeholder.com/100", // Replace with actual author image URL
  date: "August 20, 2022",
};

export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <div className="">
      <FeaturedBlog blog={featuredBlogData} />
      <section className="max-w-7xl m-auto p-4">

        <h2 className="font-bold text-2xl dark:text-white">Latest Post</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-6 p-0 md:p-6 ">
          {posts?.map((item) => (
            <Card
              key={item._id}
              image={item.image}
              category={item.categories}
              title={item.title}
              author={item.author}
              date={item.publishedAt}
              slug={item.slug}
              authorImage={item.authorImage}
            />
          ))}
        </div>
      </section>
      <section>
        <RollingGallery />
      </section>

    </div>
  );
}
