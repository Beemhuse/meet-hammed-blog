import Image from 'next/image'
import Button from '@/components/reusables/button'
import { client, urlFor } from '@/sanity/client';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';

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
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <Image 
            src="/hammed-otun.jpg" 
            alt="Hammed Otun" 
            width={200} 
            height={200} 
            className="rounded-full mx-auto mb-8 border-4 border-primary"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hammed Otun
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tech Innovator | Software Engineer | Thought Leader
          </p>
        </section>

        <section className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg mb-4">
            Hello! I'm Hammed Otun, a passionate software engineer and tech innovator with over a decade of experience in building cutting-edge solutions. My journey in the tech world has been driven by a relentless curiosity and a desire to push the boundaries of what's possible with code.
          </p>
          <p className="text-lg">
            Through this blog, I share my insights, experiences, and the latest trends in software development, cloud computing, and artificial intelligence. My goal is to inspire and empower the next generation of tech leaders.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
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
          <h2 className="text-3xl font-bold mb-4 text-center">What You'll Find Here</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">In-depth Technical Insights</h3>
              <p>Dive deep into complex technical topics, explained in a clear and accessible manner.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Industry Trends & Analysis</h3>
              <p>Stay ahead of the curve with my analysis of the latest trends in the tech industry.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Career Advice</h3>
              <p>Benefit from my experience and get practical advice for advancing your tech career.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Showcases</h3>
              <p>Get inspired by innovative projects and learn about the technologies behind them.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Others Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CTO, TechCorp', quote: 'Hammed\'s insights have been invaluable for our team. His blog is a must-read for any serious developer.' },
              { name: 'Michael Chen', role: 'Senior Software Engineer, InnovateTech', quote: 'I always look forward to Hammed\'s articles. They\'re thought-provoking and incredibly practical.' },
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
          <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>
          <p className="text-lg text-center mb-8">
            I'm always excited to connect with fellow tech enthusiasts, potential collaborators, or anyone with questions. Feel free to reach out!
          </p>
          <div className="max-w-md mx-auto">
            <Button className="w-full" size="lg">
              Contact Hammed
            </Button>
          </div>
        </section>
      </main>

   
    </div>
  )
}
