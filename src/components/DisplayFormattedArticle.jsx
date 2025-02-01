import React from "react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

// Helper function to build the image URL
function urlFor(source) {
  return builder.image(source).url();
}

const components = {
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="mt-xl mt-4">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg mt-4">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="m-auto my-4 text-lg">{children}</ol>
    ),
  },
  types: {
    image: ({ value }) => (
      <Image
        src={urlFor(value?.asset)}
        alt={value.alt || " "}
        loading="lazy"
        width={500}
        height={500}
        className="my-4"
      />
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value.href} rel={rel}>
          {children}
        </Link>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="my-5">{children}</p>,
    h1: ({ children }) => <h1 className="my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="my-4">{children}</h2>,
    h3: ({ children }) => <h3 className="my-4">{children}</h3>,
    h4: ({ children }) => <h4 className="my-4">{children}</h4>,
    h5: ({ children }) => <h5 className="my-4">{children}</h5>,
  },
};

export default function DisplayFormattedArticle({ description }) {
  return <PortableText value={description} components={components} />;
}
