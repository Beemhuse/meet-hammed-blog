import DisplayFormattedArticle from "@/components/DisplayFormattedArticle";
import { client, urlFor } from "@/sanity/client";
import { options, POSTS_QUERY } from "@/sanity/queries";
import { formatDate } from "@/utils/formatDate";
import { getFirstLetter } from "@/utils/getFirstLetter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const extractText = (content) => {
  const textContent = content
    .map((block) => block?.children?.map((child) => child.text).join(" ") || "")
    .join(" ");
  return textContent.slice(0, 100) + (textContent?.length > 50 ? "..." : "");
};
export async function generateMetadata({ params }) {
  const { slug } = await params;
  console.log(slug);
  const currentUrl = `https://www.onemapafrica.org/blog/${slug}`;

  const blog = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      "image": mainImage,
      "author": author->name,
            "authorImage": author->image.asset->url, // Fetch the author's image

      publishedAt,
      body,
      "categories": categories[]->title

    }`,
    { slug } // Correct parameter binding
  );
  console.log(blog);
  if (!blog) {
    return { title: "Blog not found" };
  }

  return {
    title: `${blog.title} | Meet Hammed Blog`,
    description: extractText(blog.body),
    openGraph: {
      title: blog.title,
      description: extractText(blog.body),
      image: blog.imageSrc,
      url: currentUrl,
    },
    twitter: {
      title: blog.title,
      description: extractText(blog.body),
      image: blog.imageSrc,
      card: "summary_large_image",
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const currentUrl = `https://meet-hammed-blog-t1oj.vercel.app/${slug}`; // Update this to your blog's domain
  const blog = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      "image": mainImage,
      "author": author->name,
            "authorImage": author->image.asset->url, // Fetch the author's image

      publishedAt,
      body,
      "categories": categories[]->title

    }`,
    { slug } // Correct parameter binding
  );
  const posts = await client.fetch(POSTS_QUERY, {}, options);
  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <>
      {/* <SEO title={blog.title} image={blog.imageSrc} /> */}
      <section className="grid xl:grid-cols-4 grid-cols-1 px-10 py-8">
        <div className="xl:col-span-3 xl:w-2/3 m-auto w-full col-span-1 flex-col justify-center">
          <span className="bg-[#F2F8F7] dark:bg-[#fff] dark:text-black rounded-xl mb-3 p-2 text-xs">
            {blog?.categories}
          </span>
          <h2 className="text-2xl dark:text-[#ededed] font-bold mt-3">{blog?.title}</h2>
          <div className="flex mt-3 items-center">
            <div className="flex items-center gap-3">
              <div className="uppercase w-10 h-10 bg-gray-200 dark:bg-[#FFD700] dark:text-black flex items-center justify-center rounded-full text-sm">
                {getFirstLetter(blog?.author)}
              </div>
              <p className="capitalize text-sm dark:text-[#ededed]">{blog?.author}</p>
            </div>
            <p className="flex text-sm dark:text-[#ededed] items-center gap-2 ml-4">
              {" "}
              <FaRegCalendarAlt /> {formatDate(blog?.publishedAt)}
            </p>
          </div>
          <div className=" mt-5">
            <Image
              src={urlFor(blog?.image)}
              alt=""
              width={500}
              height={500}
              className="object-cover  w-full aspect-auto"
            />
          </div>
          <article className=" m-auto dark:text-[#ededed]">
            <DisplayFormattedArticle description={blog?.body} />
          </article>
        </div>
        <div className="col-span-1">
          {/* Sidebar */}
          <aside className="w-full  mt-10 lg:mt-0">
            {/* Recent Posts */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-[#ededed] mb-4">
                Recent Posts
              </h3>
              <ul className="space-y-4">
                {posts?.slice(0, 3).map((recentBlog) => (
                  <li key={recentBlog._id}>
                    <Link href={`/blog/${recentBlog?.slug.current}`}>
                      <div className="flex items-center gap-4">
                        <Image
                          src={recentBlog?.image}
                          alt=""
                          width={50}
                          height={50}
                          className="object-cover"
                        />{" "}
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {recentBlog?.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(recentBlog?.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Share this article
              </h3>
              <div className="flex items-center space-x-4">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 text-white rounded-full"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(
                    blog?.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-400 text-white rounded-full"
                >
                  <FaTwitter />
                </Link>
                <Link
                  href={`https://www.linkedin.com/shareArticle?url=${currentUrl}&title=${encodeURIComponent(
                    blog?.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-700 text-white rounded-full"
                >
                  <FaLinkedinIn />
                </Link>
                <Link
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${blog?.title} - ${currentUrl}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500 text-white rounded-full"
                >
                  <FaWhatsapp />
                </Link>
              </div>
            </div>
          </aside>{" "}
        </div>
      </section>
    </>
  );
}
