import { client } from "@/sanity/client";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid"; // Import nanoid to generate unique keys

export async function POST(req) {
  try {
    // Parse JSON body
    const body = await req.json();

    const { title, slug, authorId, image, categories, publishedAt, content, isDraft } = body;
    console.log(categories)
    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }
    if (!authorId) {
      return NextResponse.json(
        { error: "Author ID is required." },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const postSlug = slug || title.toLowerCase().replace(/\s+/g, "-");

    // Convert content to Sanity block format
    const formattedContent = [
      {
        _type: "block",
        children: [{ _type: "span", text: content }],
      },
    ];
    console.log(authorId, image)
    // Create post object
    const newPost = {
      _type: "post",
      title,
      slug: { current: postSlug },
      author: { _type: "reference", _ref: authorId },
      mainImage: image
        ? {
          _type: "image",
          asset: { _type: "reference", _ref: image },
        }
        : null,
      categories: categories && categories.length > 0
        ? categories.map((categoryId) => ({
          _type: "reference",
          _key: nanoid(), // Generate a unique key for each category

          _ref: categoryId,
        }))
        : [],
      publishedAt: publishedAt || new Date().toISOString(),
      body: formattedContent && formattedContent.length > 0
        ? formattedContent.map((block) => ({
          ...block,
          _key: block._key || nanoid(), // Ensure each block has a unique _key
        }))
        : [], 
        isDraft: isDraft || false,
    };

    // Save to Sanity
    const createdPost = await client.create(newPost);

    return NextResponse.json(
      { message: "Post created successfully!", createdPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
