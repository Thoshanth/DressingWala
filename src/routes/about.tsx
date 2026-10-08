import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/layout";
import { FloatingActions } from "@/components/floating-actions";
import { buildHead } from "@/lib/seo";
import { ShieldCheck, Heart, Award, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => buildHead({
    title: "About Us | DressingWala - Trusted Home Nursing in Hyderabad",
    description: "Learn about DressingWala, Hyderabad's premier provider of professional, sterile home wound dressing and nursing services.",
    path: "/about",
  }),
});

function AboutPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">About DressingWala</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are on a mission to bring hospital-grade wound care and nursing directly to your doorstep in Hyderabad.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-foreground/90 mb-16">
            <p>
              Founded with the vision to make post-operative and chronic wound care accessible, safe, and stress-free, <b>DressingWala</b> has grown into Hyderabad's most trusted home nursing service. We understand that traveling to a hospital for routine dressing changes is not just inconvenient—it can be painful and poses a risk of secondary infections.
            </p>
            <p>
              That is why we bring the clinic to you. Our network comprises highly trained, verified, and experienced nurses who specialize in everything from simple post-surgery dressings to complex diabetic foot ulcer management.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            <div className="p-6 rounded-3xl bg-surface border">
              <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">Uncompromising Safety</h3>
              <p className="text-muted-foreground text-sm">Every visit utilizes single-use, sterile kits and strictly follows aseptic techniques to prevent surgical site infections.</p>
            </div>
            <div className="p-6 rounded-3xl bg-surface border">
              <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Professionals</h3>
              <p className="text-muted-foreground text-sm">We don't just send anyone. Every nurse undergoes rigorous background checks and continuous training in modern wound care protocols.</p>
            </div>
            <div className="p-6 rounded-3xl bg-surface border">
              <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compassionate Care</h3>
              <p className="text-muted-foreground text-sm">We treat every patient with the dignity and respect they deserve, ensuring they feel comfortable and safe in their own home.</p>
            </div>
            <div className="p-6 rounded-3xl bg-surface border">
              <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-muted-foreground text-sm">No hidden fees. You get a clear quote before the procedure begins, based on your specific wound care needs.</p>
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-gradient-soft border text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Ready to experience better care?</h2>
            <p className="text-muted-foreground mb-8">Reach out to us today and let our experts take care of your healing journey.</p>
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-brand text-primary-foreground font-semibold shadow-lift hover:scale-[1.02] transition">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
