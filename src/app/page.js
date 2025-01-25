import Card from "@/components/card/Card";
// import Image from "next/image";
import data from "../data.json";
import FeaturedBlog from "@/components/header/featured-blog";

const featuredBlogData = {
  "image": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  category: "Technology",
  title: "The Impact of Technology on the Workplace: How Technology is Changing",
  author: "Jason Francisco",
  authorImage: "https://via.placeholder.com/100", // Replace with actual author image URL
  date: "August 20, 2022",
};
export default function Home() {
  return (
    <div className="">
      <FeaturedBlog blog={featuredBlogData} />
      <section className="max-w-7xl m-auto p-4">

        <h2 className="font-bold text-2xl">Latest Post</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-6 p-0 md:p-6 ">
          {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              category={item.category}
              title={item.title}
              author={item.author}
              date={item.date}
              authorImage={item.authorImage}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
