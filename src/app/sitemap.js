import { client } from "@/sanity/client";

export default async function sitemap() {
    const baseUrl = "https://www.onemapafrica.org";
  
    const events = await client.fetch(`
        *[_type == "event"]{
          "slug": slug.current,
          _updatedAt
        }
      `);
    
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
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/get-involved`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
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
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
    ];
  
    // // Dynamic routes
    const eventRoutes = events.map((event) => ({
        url: `${baseUrl}/events/${event.slug}`,
        lastModified: new Date(event._updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    
      const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog._updatedAt),
        changeFrequency: "weekly",
        priority: 0.5,
      }));
  
      return [...staticRoutes, ...eventRoutes,  ...blogRoutes];
    }
  