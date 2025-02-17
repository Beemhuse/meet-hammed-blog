import Image from "next/image";
import Button from "@/components/reusables/button";
import { client, urlFor } from "@/sanity/client";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

export default async function Page() {
  const featuredBlogQuery = `*[_type == "featuredBlog"] {
    image,
    category,
    body,
    title,
    slug,
    content,
    author,
    authorImage,
    date
  }`;

  const featuredBlog = await client.fetch(featuredBlogQuery);
  return (
    <div className="">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <Image 
            src="/hamed.webp" 
            alt="Hamed Otun - Entrepreneur" 
            width={500} 
            height={500} 
            className="rounded mx-auto mb-8 border-4 border-primary"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hamed Otun
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visionary Entrepreneur | Business Strategist | Innovator
          </p>
        </section>

        <section className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl text-center font-bold mb-4">About Me</h2>
          <p className="text-lg mb-4">
            I am a passionate entrepreneur dedicated to innovation, business growth, and impactful leadership. With years of experience in various industries, I have built a reputation for driving business success and fostering groundbreaking ideas.
          </p>
          <p className="text-lg">
            Through this platform, I share insights on entrepreneurship, business strategy, leadership, and emerging market trends. My mission is to inspire, educate, and empower aspiring business leaders.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-start">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlog?.map((article) => (
              <Link href={`blog/${article.slug.current}`} key={article.title} className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
                <Image src={urlFor(article.image) || "/placeholder.svg"} alt={article.title} width={400} height={200} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-muted-foreground">{formatDate(article.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-muted rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-start">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Business Growth Strategies</h3>
              <p>Learn how to scale your business efficiently and sustainably.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Market Trends & Innovation</h3>
              <p>Stay updated on market trends and how to leverage them for business success.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Leadership & Mindset</h3>
              <p>Develop the mindset and skills needed to be an effective leader.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Investment & Finance</h3>
              <p>Explore financial strategies to maximize your business profitability.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-start">What Others Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[ 
              { name: 'Sarah Johnson', role: 'CEO, VisionCorp', quote: "'Hammed's insights have transformed how I approach business growth.'" },
              { name: 'Michael Chen', role: 'Investor & Business Coach', quote: 'One of the best minds in entrepreneurship today. Highly recommended!' },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-card text-card-foreground rounded-lg shadow p-6">
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-muted-foreground">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-start">Get in Touch</h2>
          <p className="text-lg text-start mb-8">
            Connect with me for mentorship, collaborations, or business opportunities. Let’s build something great together!
          </p>
          <div className="max-w-md mx-auto">
            <Button className="w-full" size="lg">
              Contact Hammed
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
