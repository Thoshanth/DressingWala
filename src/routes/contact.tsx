import { createFileRoute } from "@tanstack/react-router";
import { Navbar, Footer } from "@/components/layout";
import { FloatingActions } from "@/components/floating-actions";
import { buildHead } from "@/lib/seo";
import { CONTACT, waLink, telLink } from "@/lib/contact";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => buildHead({
    title: "Contact Us | DressingWala",
    description: "Get in touch with DressingWala for professional home wound dressing and nursing services in Hyderabad. Available 24/7 on WhatsApp.",
    path: "/contact",
  }),
});

function ContactPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Whether you need to book a home visit, have a question about our services, or need assistance, we're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-surface border flex items-start gap-4">
                <div className="w-12 h-12 bg-whatsapp/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-whatsapp" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">WhatsApp Us</h3>
                  <p className="text-sm text-muted-foreground mb-3">Fastest way to book and share details.</p>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-whatsapp font-semibold hover:underline">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-surface border flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-sm text-muted-foreground mb-3">Available for urgent bookings.</p>
                  <a href={telLink()} className="text-primary font-semibold hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-surface border flex items-start gap-4">
                <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground mb-3">For business and general inquiries.</p>
                  <a href={`mailto:${CONTACT.email}`} className="text-teal font-semibold hover:underline">
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-surface border">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-teal" /> Operating Area</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We currently provide home nursing services across all major localities in <b>Hyderabad and Secunderabad</b>, including Gachibowli, Madhapur, Hitech City, and surrounding areas.
                </p>
                <div className="p-4 rounded-xl bg-teal/5 text-sm">
                  <b>Headquarters:</b><br />
                  Hyderabad, Telangana, India
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-surface border">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-teal" /> Operating Hours</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between"><span>Monday - Sunday</span> <span className="font-medium text-foreground">24 Hours</span></li>
                  <li className="text-xs pt-2 mt-2 border-t text-muted-foreground">Note: Same-day visits should be booked before 3 PM.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
