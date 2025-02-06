import { client } from "@/sanity/client";

// Fetch blog data from Sanity
export const fetchBlogs = async () => {
  try {
    const data = await client.fetch(
      `*[_type == "blog" && !(_id in path("drafts.**"))]{
          title,
          slug,
          "imageSrc": mainImage.asset->url,
          "author": author->name,
        "description": content,
          "date":publishedAt,
        "categories": categories[]->title // Fetch category titles
        }`
    );
    return data;

  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};


// Fetch all team members
export const fetchTeam = async () => {
  try {
    const data = await client.fetch(
      `*[_type == "team"  && !(_id in path("drafts.**"))]{
          name,
          "imageSrc": image.asset->url,
          role,
          socialLinks
        }`
    );
    return data;
  } catch (error) {
    console.error("Error fetching team data:", error);
    throw error;
  }
};

export const fetchPlans = async () => {
  try {
    const data = await client.fetch(
      `*[_type == "pricing" && !(_id in path("drafts.**"))]{
          _id,
          name,
          price,
          highlighted,
          benefits,
          "description": description,
        }`
    );
    return data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};


// Fetch events from the Sanity CMS
export const fetchEvents = async () => {
  try {
    const data = await client.fetch(
      `*[_type == "event" && !(_id in path("drafts.**"))]{
              title,
              slug,
              "imageSrc": imageUrl,
              "date": date,
              location,
              description,
              eventCategory,
              registrationLink
          }`
    );
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
export const fetchCategories = async () => {
  try {
    const data = await client.fetch(
      `*[_type == "category" && !(_id in path("drafts.**"))]{
              title,
          }`
    );
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
export const fetchPrograms = async () => {
  try {
    const query = `*[_type == "program" && !(_id in path("drafts.**"))]{
      image,
      title,
      description,
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
