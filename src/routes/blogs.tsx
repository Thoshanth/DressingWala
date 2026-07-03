import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/layout";
import { ArrowRight, Clock, User } from "lucide-react";
import { FloatingActions } from "@/components/floating-actions";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
});

const SAMPLE_BLOGS = [
  {
    id: 1,
    title: "Understanding Diabetic Foot Ulcers: Causes, Symptoms, and Care",
    excerpt: "Diabetic foot ulcers are a severe complication of diabetes. Learn how proper wound care at home can prevent infections and speed up recovery.",
    author: "Dr. Sandhya R.",
    date: "Oct 12, 2023",
    category: "Diabetic Care",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
  },
  {
    id: 2,
    title: "The Importance of Sterile Technique in Post-Surgery Wound Dressing",
    excerpt: "Why is a sterile environment crucial for post-operative care? Discover the best practices our nurses follow to ensure you heal safely.",
    author: "Sr. Anitha R.",
    date: "Sep 28, 2023",
    category: "Post-Op Recovery",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80"
  },
  {
    id: 3,
    title: "Managing Pressure Sores for Bedridden Patients",
    excerpt: "Bedsores can develop quickly and be painful. Read our comprehensive guide on preventing and treating pressure ulcers at home.",
    author: "Sr. Rakesh K.",
    date: "Sep 15, 2023",
    category: "Elderly Care",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
  },
  {
    id: 4,
    title: "When to Seek Immediate Medical Attention for a Wound",
    excerpt: "Not all wounds can be treated at home. Learn the critical warning signs of infection and when you need to rush to the emergency room.",
    author: "Dr. Vivek M.",
    date: "Aug 30, 2023",
    category: "First Aid",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80"
  }
];

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
            {SAMPLE_BLOGS.map((blog) => (
              <article key={blog.id} className="group rounded-3xl border bg-card overflow-hidden hover:shadow-lift transition flex flex-col">
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
                  <button className="flex items-center gap-2 text-sm font-semibold text-teal group-hover:text-teal/80 transition w-fit">
                    Read full article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
