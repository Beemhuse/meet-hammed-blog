export const options = { next: { revalidate: 30 } };

export const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt asc)[0...12]{_id, title,"image": mainImage,
        "categories": categories[]->title,
 slug,body, publishedAt, "author": author->name}`;
