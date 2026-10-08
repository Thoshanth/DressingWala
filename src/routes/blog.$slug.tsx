import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { blogPosts } from "@/lib/blogs";
import { buildHead, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { Navbar, Footer } from "@/components/layout";
import { FloatingActions } from "@/components/floating-actions";
import { BookingDialog } from "@/components/booking-dialog";
import { ArrowLeft, Clock, User, ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/contact";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params: { slug } }) => {
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return buildHead({
      title: `${post.title} | DressingWala Blog`,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.image,
      jsonLd: [
        articleSchema({
          headline: post.title,
          path: `/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          authorName: post.author,
          reviewerName: post.reviewer,
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/blogs" },
          { name: post.title, path: `/blog/${post.slug}` }
        ]),
      ],
    });
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <article className="max-w-3xl mx-auto px-4 md:px-6">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>

          <header className="mb-10 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold uppercase tracking-wider text-teal mb-4">
              <span className="px-3 py-1 bg-teal/10 rounded-full">{post.category}</span>
              <span className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground border-y py-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-surface grid place-items-center font-bold text-teal">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-foreground">{post.author}</div>
                  <div className="text-xs">Published {new Date(post.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>
              
              {post.reviewer && (
                <div className="flex items-center gap-2 pl-6 md:border-l">
                  <div className="w-10 h-10 rounded-full bg-surface grid place-items-center font-bold text-primary">
                    {post.reviewer.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs">Medically reviewed by</div>
                    <div className="font-medium text-foreground">{post.reviewer}, <span className="font-normal text-muted-foreground">{post.reviewerCredentials}</span></div>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="rounded-3xl overflow-hidden mb-12 shadow-lg aspect-video bg-surface">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-display prose-a:text-teal hover:prose-a:text-teal/80 prose-img:rounded-2xl">
            {post.content.map((html: string, i: number) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-gradient-soft border text-center">
            <h3 className="text-2xl font-bold font-display mb-4">Need Professional Home Dressing?</h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Our verified nurses in Hyderabad provide sterile, compassionate wound care directly at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.dispatchEvent(new Event("open-booking"))}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-primary-foreground font-semibold shadow-lift hover:scale-[1.02] transition"
              >
                <Calendar className="w-5 h-5" /> Book Home Visit
              </button>
              <a
                href={waLink("Hi DressingWala, I read an article and need a home dressing.")}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-whatsapp text-white font-semibold shadow-soft hover:scale-[1.02] transition"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </article>

        {otherPosts.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 md:px-6 mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold font-display">More articles</h2>
              <Link to="/blogs" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal/80 transition">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {otherPosts.map((blog) => (
                <Link to="/blog/$slug" params={{ slug: blog.slug }} key={blog.id} className="group rounded-2xl border bg-card overflow-hidden hover:shadow-lift transition flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs font-semibold text-teal mb-2">{blog.category}</div>
                    <h3 className="font-bold font-display mb-2 group-hover:text-teal transition line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {blog.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <FloatingActions />
      <BookingDialog />
    </div>
  );
}
