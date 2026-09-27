import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bandage, Stethoscope, Syringe, HeartPulse, Droplets, Scissors,
  ShieldCheck, Clock, MapPin, Star, Phone, MessageCircle, Calendar,
  CheckCircle2, ChevronDown, AlertTriangle, Upload, Sparkles, UserCheck,
  BadgeCheck, Users, Home, Camera,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingActions } from "@/components/floating-actions";
import { BookingDialog, openBooking } from "@/components/booking-dialog";
import { Navbar, Footer } from "@/components/layout";
import { CONTACT, waLink, telLink } from "@/lib/contact";
import heroImg from "@/assets/hero-nurse.jpg";
import logo from "@/assets/Logo.jpg";

export const Route = createFileRoute("/")({
  component: Home_,
});

const services = [
  { icon: Bandage, title: "Simple Wound Dressing", desc: "Cuts, abrasions, minor injuries with sterile technique.", price: "₹599" },
  { icon: Stethoscope, title: "Post Surgery Dressing", desc: "Post-operative sites, drain checks, sterile care.", price: "₹899" },
  { icon: HeartPulse, title: "Diabetic Foot Wounds", desc: "Specialized dressings and wound monitoring for diabetics.", price: "₹799" },
  { icon: Droplets, title: "Complex / Large Wounds", desc: "Advanced dressings for burns, deep wounds, trauma and poly trauma open wounds", price: "₹1,199" },
  { icon: Scissors, title: "Suture / Staple Removal", desc: "Gentle, clean removal after your surgeon's clearance.", price: "₹999" },
];

const whyUs = [
  { icon: ShieldCheck, title: "Verified Nurses", desc: "Every clinician is background-checked, licensed and trained in modern wound care." },
  { icon: Clock, title: "Same-Day Visits", desc: "Book before 3 PM for same-day service. Emergency slots available." },
  { icon: Home, title: "Sterile & Discreet", desc: "Single-use kits, aseptic technique, respectful of your home and privacy." },
  { icon: BadgeCheck, title: "Transparent Pricing", desc: "Clear starting prices. Final quote shared before we begin." },
];

const steps = [
  { n: "01", title: "Book in 60 seconds", desc: "Tap Book Home Dressing or message us on WhatsApp." },
  { n: "02", title: "Share details", desc: "Send location, prescription , wound pictures (if any) and your preferred time." },
  { n: "03", title: "Nurse/Technician assigned", desc: "A verified DressingWala nurse/technician is assigned to your address." },
  { n: "04", title: "Care at home", desc: "Sterile dressing done at home and receive your invoice." },
];

const areas = [
  "Gachibowli", "Madhapur", "Hitech City", "Kondapur", "Kukatpally", "Banjara Hills",
  "Jubilee Hills", "Begumpet", "Secunderabad", "Ameerpet", "Uppal", "LB Nagar",
  "Miyapur", "Manikonda", "Financial District", "Attapur",
];

const clinicians = [
  { name: "Sr. Anitha R.", role: "Senior Wound Care Nurse", exp: "9 yrs", specialty: "Diabetic ulcer & post-op" },
  { name: "Sr. Rakesh K.", role: "Registered Nurse (RN)", exp: "6 yrs", specialty: "Complex wound dressing" },
  { name: "Sr. Fatima S.", role: "Home-Care Specialist", exp: "7 yrs", specialty: "Post-surgery recovery" },
  { name: "Sr. Vinod P.", role: "Critical Care Nurse", exp: "10 yrs", specialty: "Burns & pressure sores" },
];


const faqs = [
  { q: "How quickly can a nurse reach me?", a: "In most Hyderabad neighborhoods within 60–120 minutes. Book before 3 PM for same-day service; emergency slots may be available on request." },
  { q: "How is the final charge decided?", a: "The 'starting from' prices are for standard cases. Final charges depend on wound type, dressing materials required, travel distance and the clinician's on-site assessment. You'll always receive a clear quote before we begin." },
  { q: "Are your nurses verified?", a: "Yes. Every clinician is licensed, background-verified, trained in aseptic technique, and carries ID." },
  { q: "Do you bring the dressing materials?", a: "Yes, we carry sterile single-use kits and standard dressings. Specialty dressings (e.g. hydrocolloid, foam, alginate) are billed separately at MRP." },
  { q: "Can I share my doctor's prescription?", a: "Absolutely. Send it on WhatsApp when booking so we prepare the right materials." },
  { q: "Do you cover areas outside Hyderabad?", a: "We currently serve Hyderabad and surrounding suburbs. Contact us to check your locality." },
];

const chatFlow = [
  { icon: MessageCircle, title: "Say hi on WhatsApp", desc: "Tap the WhatsApp button — we reply within minutes." },
  { icon: MapPin, title: "Share your location", desc: "Send a live location pin so we can dispatch the nearest nurse." },
  { icon: Upload, title: "Upload documents", desc: "Send photo of your treatment details, documents / prescription." },
  { icon: Camera, title: "Wound Pictures", desc: "It helps us prepare material and proper Quotation." },
  { icon: Clock, title: "Choose preferred time", desc: "Pick a slot that suits you — today, tomorrow, or later." },
  { icon: CheckCircle2, title: "Booking confirmed", desc: "You'll get an SMS + WhatsApp confirmation with nurse/technician details." },
];

function Section({ id, eyebrow, title, subtitle, children }: { id?: string; eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 md:py-28 px-4 md:px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          {eyebrow && (
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal mb-3">{eyebrow}</span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
          {subtitle && <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}


function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 bg-gradient-hero" aria-label="Hero section - DressingWala home wound care services">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 text-teal text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            Serving Hyderabad · Same-day visits
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Professional Sterile Wound Dressing & Nursing Services,{" "}
            <span className="text-gradient-brand">at your doorstep in Hyderabad.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-lg md:max-w-none">
            <strong>Verified nurses, technicians, and doctors</strong> for wound dressing of pre- and post-operative wounds, including <em>complex trauma</em> and <em>non-healing ulcers</em>, <em>diabetic foot wounds</em>, and <em>venous ulcers</em>. Same-day home visits across Hyderabad including Gachibowli, Madhapur, Hitech City, and more.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href={waLink("Hi DressingWala, I'd like to book a home dressing.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-primary-foreground font-semibold shadow-lift hover:scale-[1.02] active:scale-[0.98] transition"
              aria-label="Book home wound dressing service via WhatsApp"
            >
              <Calendar className="w-5 h-5" /> Book Home Dressing
            </a>
            <a
              href={waLink("Hi DressingWala, I have a question.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-whatsapp text-white font-semibold shadow-soft hover:scale-[1.02] active:scale-[0.98] transition"
              aria-label="Contact DressingWala on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-start text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-teal" /> Verified nurses, technicians and doctors</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-lift">
            <img
              src={heroImg}
              alt="Professional DressingWala registered nurse performing sterile wound dressing at patient's home in Hyderabad"
              title="Home Wound Dressing Service in Hyderabad by DressingWala"
              width={1600} height={1200}
              loading="eager"
              className="w-full h-full object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="absolute -bottom-6 -left-2 md:-left-6 bg-card border rounded-2xl p-4 shadow-lift w-52 animate-float"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-teal/15 text-teal">
                <UserCheck className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">Nurse assigned</div>
                <div className="text-sm font-semibold">Sr. Anitha · 9 yrs</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Arriving in ~35 min</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="absolute -top-4 -right-2 md:-right-6 bg-card border rounded-2xl p-4 shadow-lift flex items-center gap-2"
          >
            <span className="grid place-items-center w-8 h-8 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
            </span>
            <div className="text-xs">
              <div className="font-semibold">AI Care Assistant</div>
              <div className="text-muted-foreground">Ask anything, 24×7</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <Section id="services" eyebrow="Services" title="Home care, done right & Comfortable" subtitle="From simple dressings to complex post-operative care — everything you need, at home. All services include sterile equipment, verified healthcare professionals, and transparent pricing.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.05 }}
            className="group rounded-3xl border bg-card p-6 hover:shadow-lift hover:-translate-y-1 hover:border-primary/30 transition-all"
            itemScope itemType="https://schema.org/Service"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-brand text-primary-foreground grid place-items-center mb-4 group-hover:scale-110 transition">
              <s.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg" itemProp="name">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground" itemProp="description">{s.desc}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Starting from</span>
              <span className="font-bold text-primary text-lg" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="priceCurrency" content="INR" />
                <span itemProp="price">{s.price}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Pricing() {
  return (
    <Section id="pricing" eyebrow="Service Charges" title="Simple, transparent pricing." subtitle="Starting prices for common services. Final charges depend on wound type, dressing materials, travel distance and the clinician's on-site assessment.">
      <div className="rounded-3xl border bg-card overflow-hidden shadow-soft">
        <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 px-6 py-4 bg-surface text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Service</div>
          <div>Starting from</div>
          <div>Book</div>
        </div>
        <ul>
          {services.map((s) => (
            <li key={s.title} className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto] items-center gap-4 md:gap-6 px-4 md:px-6 py-4 border-t first:border-t-0 hover:bg-surface transition">
              <div className="w-11 h-11 rounded-xl bg-teal/10 text-teal grid place-items-center shrink-0">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{s.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{s.desc}</div>
              </div>
              <div className="font-bold text-primary text-lg whitespace-nowrap">{s.price}</div>
              <a
                href={waLink(`Hi DressingWala, I'd like to book: ${s.title}`)}
                target="_blank" rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                Book
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 rounded-2xl border border-teal/30 bg-teal/5 p-5 text-sm text-foreground/80 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-foreground">Please note:</span> All prices are "starting from" and indicative.
          Final charges depend on the <b>wound type</b>, <b>dressing materials used</b>, <b>travel distance</b> and the
          nurse's <b>on-site clinical assessment</b>. You'll always get a clear quote before we begin.
        </p>
      </div>
    </Section>
  );
}

function Why() {
  return (
    <Section id="why" eyebrow="Why DressingWala" title="Care you can trust.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {whyUs.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="rounded-3xl p-6 bg-card border hover:border-teal/40 hover:shadow-glow transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-teal/10 text-teal grid place-items-center mb-4">
              <w.icon className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold">{w.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function How() {
  return (
    <Section id="how" eyebrow="How it works" title="Book in minutes. Care within hours.">
      <div className="grid md:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="relative rounded-3xl p-6 bg-gradient-soft border"
          >
            <div className="text-5xl font-display font-bold text-gradient-brand opacity-90">{s.n}</div>
            <h3 className="mt-3 font-bold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* WhatsApp chatbot flow */}
      <div className="mt-16 rounded-3xl border bg-card p-6 md:p-10 shadow-soft">
        <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-start">
          <div className="w-14 h-14 rounded-2xl bg-whatsapp text-white grid place-items-center shrink-0">
            <MessageCircle className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-whatsapp">WhatsApp booking flow</div>
            <h3 className="mt-1 text-2xl md:text-3xl font-bold">Book without downloads or logins.</h3>
            <p className="mt-2 text-muted-foreground">Our hassle-free automated WhatsApp assistant guides you through booking in under a minute.</p>
          </div>
        </div>
        <ol className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {chatFlow.map((f, i) => (
            <li key={f.title} className="relative rounded-2xl border bg-surface p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-teal">STEP {i + 1}</span>
              </div>
              <f.icon className="w-5 h-5 text-primary" />
              <div className="mt-2 font-semibold text-sm">{f.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{f.desc}</div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-whatsapp text-white font-semibold shadow-soft hover:scale-[1.02] transition">
            <MessageCircle className="w-4 h-4" /> Start booking on WhatsApp
          </a>
        </div>
      </div>
    </Section>
  );
}

function Areas() {
  return (
    <Section id="areas" eyebrow="Coverage" title={"We\u00A0\u00A0\u00A0cover\u00A0\u00A0\u00A0Hyderabad."} subtitle="Professional home wound dressing service across major localities in Hyderabad and Secunderabad. Same-day visits available in Gachibowli, Madhapur, Hitech City, Kondapur, and all major areas. Don't see your area? Message us — we're expanding fast.">
      <div className="rounded-3xl border bg-card p-6 md:p-8" itemScope itemType="https://schema.org/Service">
        <div className="flex items-center gap-2 mb-6 text-muted-foreground">
          <MapPin className="w-4 h-4 text-teal" />
          <span className="text-sm">Live coverage — Hyderabad & Secunderabad</span>
        </div>
        <nav aria-label="Service coverage areas in Hyderabad">
          <ul className="flex flex-wrap gap-2" role="list">
            {areas.map((a) => (
              <li key={a} itemProp="areaServed" itemScope itemType="https://schema.org/Place">
                <span itemProp="name" className="px-4 py-2 rounded-full bg-surface border text-sm font-medium hover:border-primary hover:text-primary transition cursor-default inline-block">
                  {a}
                </span>
              </li>
            ))}
            <li>
              <a href={waLink("Do you cover my area? My locality is …")} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-brand text-primary-foreground text-sm font-semibold inline-block"
                aria-label="Check if your area in Hyderabad is covered">
                + Check your area
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Section>
  );
}

function Clinicians() {
  return (
    <Section id="clinicians" eyebrow="Safety & Trust" title="100% Verified Healthcare Professionals.">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mb-8">
          <BadgeCheck className="w-10 h-10 text-teal" />
        </div>
        <h3 className="text-2xl font-display font-semibold">Strict Background Verification</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Your safety is our absolute priority. We do not compromise on the quality of care you receive at home.
          Every single doctor, nurse, and healthcare professional in our network undergoes a rigorous,
          multi-step background verification process before they ever step foot in your home.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 pt-8 text-left">
          <div className="p-6 bg-card border rounded-2xl">
            <Users className="w-6 h-6 text-teal mb-3" />
            <h4 className="font-semibold mb-2">Identity Checks</h4>
            <p className="text-sm text-muted-foreground">Comprehensive identity and address verification to ensure complete peace of mind.</p>
          </div>
          <div className="p-6 bg-card border rounded-2xl">
            <BadgeCheck className="w-6 h-6 text-teal mb-3" />
            <h4 className="font-semibold mb-2">Credential Verification</h4>
            <p className="text-sm text-muted-foreground">Thorough vetting of medical licenses, certifications, and past experience.</p>
          </div>
          <div className="p-6 bg-card border rounded-2xl">
            <Star className="w-6 h-6 text-teal mb-3" />
            <h4 className="font-semibold mb-2">Continuous Training</h4>
            <p className="text-sm text-muted-foreground">Ongoing training in sterile techniques and modern wound care protocols.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}


function Emergency() {
  return (
    <section className="px-4 md:px-6 py-16">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative bg-gradient-brand text-primary-foreground p-8 md:p-12 shadow-lift">
        <div className="absolute inset-0 opacity-20 bg-gradient-hero pointer-events-none" />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" /> Emergency home visit
            </div>
            <h3 className="mt-4 text-2xl md:text-4xl font-bold leading-tight">Need urgent dressing today?</h3>
            <p className="mt-2 opacity-90 md:text-lg">We keep emergency slots open for post-op bleeds, unplanned wound care emergencies.</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:min-w-[240px]">
            <a href={telLink()} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-primary font-semibold hover:scale-[1.02] transition">
              <Phone className="w-4 h-4" /> Call {CONTACT.phoneDisplay}
            </a>
            <a href={waLink("URGENT: I need a home dressing visit as soon as possible.")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 transition">
              <MessageCircle className="w-4 h-4" /> WhatsApp SOS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered.">
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((f, i) => {
          const open = openIdx === i;
          return (
            <div key={f.q} className="rounded-2xl border bg-card overflow-hidden">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
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
    </Section>
  );
}


function Home_() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Why />
        <How />
        <Areas />
        <Clinicians />
        <Emergency />
        <FAQ />
      </main>
      <Footer />
      <FloatingActions />
      <BookingDialog />
    </div>
  );
}
