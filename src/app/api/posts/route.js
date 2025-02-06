import { client } from "@/sanity/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse FormData
    const formData = await req.formData();
    console.log("Received FormData:", formData);

    const title = formData.get("title");
    const slug = formData.get("slug");
    const authorId = formData.get("authorId");
    const mainImage = formData.get("mainImage"); // File or reference
    const categories = formData.getAll("categories"); // Multiple categories
    const publishedAt = formData.get("publishedAt") || new Date().toISOString();
    const content = formData.get("content");

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const newPost = {
      _type: "post",
      title,
      slug: { current: slug },
      author: { _type: "reference", _ref: authorId },
      mainImage: mainImage ? { _type: "image", asset: { _ref: mainImage } } : null,
      categories: categories.map((cat) => ({ _type: "reference", _ref: cat })),
      publishedAt,
      body: content,
    };

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
