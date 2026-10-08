import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/layout";
import { ArrowRight, Clock, User } from "lucide-react";
import { FloatingActions } from "@/components/floating-actions";
import { buildHead } from "@/lib/seo";
import { blogPosts } from "@/lib/blogs";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
  head: () => buildHead({
    title: "Wound Care Articles & Resources | DressingWala",
    description: "Expert insights, tips, and guides on wound care, post-surgery recovery, and maintaining health at home.",
    path: "/blogs",
  }),
});

function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Our Latest Articles</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert insights, tips, and guides on wound care, post-surgery recovery, and maintaining health at home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((blog) => (
              <Link to="/blog/$slug" params={{ slug: blog.slug }} key={blog.id} className="group rounded-3xl border bg-card overflow-hidden hover:shadow-lift transition flex flex-col">
                <div className="h-60 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/90 text-teal rounded-full shadow-sm backdrop-blur">
                      {blog.category}
                    </span>
                  </div>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author}</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</div>
                  </div>
                  <h2 className="text-2xl font-bold font-display mb-3 group-hover:text-teal transition">
                    {blog.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    {blog.excerpt}
                  </p>
                  <span className="flex items-center gap-2 text-sm font-semibold text-teal group-hover:text-teal/80 transition w-fit">
                    Read full article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
