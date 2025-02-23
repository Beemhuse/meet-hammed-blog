
import Card from "@/components/card/Card";
import FeaturedBlog from "@/components/header/featured-blog";
import RollingGallery from "@/components/rolling-gallery";
import { client, urlFor } from "@/sanity/client";
import { options, } from "@/sanity/queries";
import { fetchGallery } from "@/services/apiService";

export default async function Home() {
  const featuredBlogQuery = `*[_type == "featuredBlog"][0] {
    image { asset->{url} },
    category,
    title,
    author,
    authorImage,
    date
  }`;

  const featuredBlog = await client.fetch(featuredBlogQuery);
  const query = `*[_type == "post" && isDraft == false]{
        _id, 
        title,
        "image": mainImage,
        "category": categories[]->title,
        slug,
        body, 
        publishedAt, 
        "author": author->name
      }`
  const posts = await client.fetch(query, {}, options);
  const gallery = await fetchGallery()
  return (
    <div className="">
      <FeaturedBlog blog={featuredBlog} />
      <section className="max-w-7xl m-auto p-4">

        <h2 className="font-bold text-2xl dark:text-white">Latest Post</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-6 p-0 md:p-6 ">
          {posts?.map((item) => (
            <Card
              key={item._id}
              image={item.image}
              category={item.category}
              title={item.title}
              author={item.author}
              date={item.publishedAt}
              slug={item.slug}
              authorImage={item.authorImage}
            />
          ))}
        </div>
      </section>
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-3xl mb-8 dark:text-white">Explore Our Gallery</h2>
          <RollingGallery images={gallery} />
          
        
        </div>
      </section>

    </div>
  );
}
