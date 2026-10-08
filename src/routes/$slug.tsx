import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { servicePages } from "@/lib/service-pages";
import { buildHead, serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { Navbar, Footer } from "@/components/layout";
import { FloatingActions } from "@/components/floating-actions";
import { BookingDialog } from "@/components/booking-dialog";
import { ChevronDown, AlertTriangle, Calendar, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { waLink } from "@/lib/contact";
import { motion } from "framer-motion";

export const Route = createFileRoute("/$slug")({
  loader: ({ params: { slug } }) => {
    const page = servicePages.find((p) => p.slug === slug);
    if (!page) {
      throw notFound();
    }
    return { page };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { page } = loaderData;
    return buildHead({
      title: page.metaTitle,
      description: page.metaDescription,
      path: page.path,
      jsonLd: [
        serviceSchema({ name: page.h1, description: page.metaDescription, path: page.path }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/#services" },
          { name: page.h1, path: page.path }
        ]),
        faqSchema(page.faqs),
      ],
    });
  },
  component: ServicePage,
});

function ServicePage() {
  const { page } = Route.useLoaderData();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const relatedPages = page.relatedSlugs
    .map(slug => servicePages.find(p => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <article className="max-w-4xl mx-auto px-4 md:px-6">
          <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <Link to="/#services" className="hover:text-primary transition">Services</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{page.h1}</span>
          </nav>

          {page.emergencyNotice && (
            <div className="mb-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-destructive-foreground flex gap-4 items-start shadow-sm">
              <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-lg mb-1">Important Medical Notice</p>
                <p className="text-sm/relaxed">
                  If you have fever, rapidly spreading redness, severe pain, or black or foul-smelling tissue, go to a hospital emergency room immediately. DressingWala provides nursing dressing care at home after a doctor has assessed the condition. We do not diagnose or treat emergencies.
                </p>
              </div>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
            {page.h1}
          </h1>

          {page.reviewedBy && (
            <div className="flex items-center gap-3 mb-8 pb-8 border-b text-sm">
              <div className="w-10 h-10 rounded-full bg-surface grid place-items-center font-bold text-teal">
                {page.reviewedBy.name.charAt(0)}
              </div>
              <div>
                <div className="text-muted-foreground">Reviewed by</div>
                <div className="font-semibold">{page.reviewedBy.name}, <span className="text-muted-foreground font-normal">{page.reviewedBy.credentials}</span></div>
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-foreground/90">
            {page.intro.map((p, i) => (
              <p key={i} className="mb-6 leading-relaxed">{p}</p>
            ))}

            <div className="my-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.dispatchEvent(new Event("open-booking"))}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-primary-foreground font-semibold shadow-lift hover:scale-[1.02] active:scale-[0.98] transition"
              >
                <Calendar className="w-5 h-5" /> Book Home Dressing
              </button>
              <a
                href={waLink(`Hi DressingWala, I'd like to book: ${page.h1}`)}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-whatsapp text-white font-semibold shadow-soft hover:scale-[1.02] active:scale-[0.98] transition"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-surface rounded-2xl p-6 border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">Who is this for?</h3>
                <ul className="space-y-3">
                  {page.whoItsFor.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface rounded-2xl p-6 border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">What the nurse does</h3>
                <ul className="space-y-3">
                  {page.whatTheNurseDoes.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">Step-by-Step Procedure</h3>
            <div className="space-y-4 mb-12">
              {page.procedureSteps.map((step, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <div className="w-8 h-8 rounded-full bg-teal/10 text-teal font-bold grid place-items-center shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-4">How Often Should It Be Changed?</h3>
            <p className="mb-12 leading-relaxed">{page.howOftenChanged}</p>

            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 mb-12">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Warning Signs
              </h3>
              <ul className="space-y-2">
                {page.warningSigns.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start text-red-900/80 dark:text-red-200/80">
                    <span className="text-red-500 mt-1.5">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-teal/5 p-5 text-sm mb-12">
              <span className="font-semibold">Starting Price:</span> {page.priceNote}. Final charges depend on wound type, materials, and distance.
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-3 mb-16">
              {page.faqs.map((f, i) => {
                const open = openIdx === i;
                return (
                  <div key={f.q} className="rounded-xl border bg-card overflow-hidden">
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-surface transition"
                    >
                      <span className="font-semibold">{f.q}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition ${open ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                    </button>
                    {open && (
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-up">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {relatedPages.length > 0 && (
              <div className="mt-16 pt-12 border-t">
                <h3 className="text-2xl font-bold mb-6">Related Services</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedPages.map(rp => (
                    <Link key={rp.slug} to={rp.path} className="p-5 rounded-2xl border bg-card hover:shadow-lift hover:border-primary/30 transition group flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold group-hover:text-primary transition">{rp.h1}</h4>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{rp.metaDescription}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-teal">
                        Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
      <FloatingActions />
      <BookingDialog />
    </div>
  );
}
