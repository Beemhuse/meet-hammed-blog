import { client } from "@/sanity/client";

export default async function sitemap() {
    const baseUrl = "https://www.meethamed.com";
  
 
    
      const blogs = await client.fetch(`
        *[_type == "blog"]{
          "slug": slug.current,
          _updatedAt
        }
      `);
    // Static routes
    const staticRoutes = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/team`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
     
    ];
  
    // // Dynamic routes

    
      const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog._updatedAt),
        changeFrequency: "weekly",
        priority: 0.5,
      }));
  
      return [...staticRoutes,  ...blogRoutes];
    }
  