import { useState, useEffect } from "react";
import { Phone, Calendar, Menu, X, MessageCircle, MapPin, Mail } from "lucide-react";
import { openBooking } from "@/components/booking-dialog";
import { CONTACT, waLink, telLink } from "@/lib/contact";
import logo from "@/assets/Logo.jpg";
import { Link, useLocation } from "@tanstack/react-router";

import { servicePages } from "@/lib/service-pages";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" } // trigger when section is in top 40% of viewport
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]); // re-run if path changes

  const links = [
    { label: "Services", href: "/#services", id: "services" },
    { label: "Pricing", href: "/#pricing", id: "pricing" },
    { label: "How it works", href: "/#how", id: "how" },
    { label: "Areas", href: "/#areas", id: "areas" },
    { label: "FAQ", href: "/#faq", id: "faq" },
    { label: "Blogs", href: "/blogs", id: "blogs" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  
  return (
    <header className="fixed top-0 inset-x-0 z-30 backdrop-blur-lg bg-background/80 border-b">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 md:h-24 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img src={logo} alt="DressingWala" className="h-12 md:h-16 w-auto object-contain shrink-0 mix-blend-multiply dark:mix-blend-screen dark:invert" />
          <span className="font-display font-bold text-xl md:text-2xl truncate">DressingWala</span>
        </Link>
        <nav className="hidden md:flex items-center justify-center gap-7 text-sm font-medium text-muted-foreground">
          {links.map((l) => {
            const isActive = activeSection === l.id || (location.pathname === "/blogs" && l.id === "blogs");
            return l.href.startsWith("/") && !l.href.includes("#") ? (
              <Link key={l.href} to={l.href} className={`transition ${isActive ? "text-primary font-bold" : "hover:text-foreground"}`}>{l.label}</Link>
            ) : (
              <a key={l.href} href={l.href} onClick={(e) => handleScroll(e, l.id)} className={`transition ${isActive ? "text-primary font-bold" : "hover:text-foreground"}`}>{l.label}</a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a href={telLink()} aria-label="Call us" className="hidden sm:grid place-items-center w-10 h-10 rounded-xl border hover:border-primary transition">
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={waLink("Hi DressingWala, I'd like to book a home dressing.")}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-brand text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-lift transition"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Book Home Dressing</span>
            <span className="sm:hidden">Book</span>
          </a>
          <button
            className="md:hidden grid place-items-center w-10 h-10 rounded-xl border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col text-sm">
            {links.map((l) => {
              const isActive = activeSection === l.id || (location.pathname === "/blogs" && l.id === "blogs");
              return l.href.startsWith("/") && !l.href.includes("#") ? (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={`py-3 border-b last:border-b-0 ${isActive ? "text-primary font-bold" : ""}`}>{l.label}</Link>
              ) : (
                <a key={l.href} href={l.href} onClick={(e) => { handleScroll(e, l.id); setOpen(false); }} className={`py-3 border-b last:border-b-0 ${isActive ? "text-primary font-bold" : ""}`}>{l.label}</a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const location = useLocation();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="border-t bg-surface mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="DressingWala" className="h-12 md:h-16 w-auto object-contain mix-blend-multiply dark:mix-blend-screen dark:invert" />
            <span className="font-display font-bold text-lg">DressingWala</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Premium home wound-dressing and post-surgery care in Hyderabad. Verified nurses, sterile technique, transparent pricing.
          </p>
        </div>
        
        <div className="col-span-2">
          <h4 className="font-semibold text-sm mb-3">Our Services</h4>
          <ul className="text-sm space-y-2 text-muted-foreground grid sm:grid-cols-2 gap-x-4 gap-y-2">
            {servicePages.map(page => (
              <li key={page.slug}>
                <Link to={page.path} className="hover:text-foreground line-clamp-1" title={page.h1}>{page.h1.replace(" at Home in Hyderabad", "").replace(" at Home After Surgery, Hyderabad", "")}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h4 className="font-semibold text-sm mb-3">Reach us</h4>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> <a href={telLink()} className="hover:text-foreground">{CONTACT.phoneDisplay}</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 shrink-0" /> <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">WhatsApp us</a></li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 shrink-0 mt-0.5" /> <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground break-all">{CONTACT.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /> <span>Hyderabad, India</span></li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h4 className="font-semibold text-sm mb-3">Quick links</h4>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li><a href="/#services" onClick={(e) => handleScroll(e, "services")} className="hover:text-foreground">Services</a></li>
            <li><a href="/#pricing" onClick={(e) => handleScroll(e, "pricing")} className="hover:text-foreground">Pricing</a></li>
            <li><a href="/#areas" onClick={(e) => handleScroll(e, "areas")} className="hover:text-foreground">Areas we serve</a></li>
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/blogs" className="hover:text-foreground">Blogs</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 text-xs text-muted-foreground flex flex-wrap gap-3 justify-between">
          <span>© {new Date().getFullYear()} DressingWala. All rights reserved.</span>
          <span>Not a substitute for emergency medical care. For life-threatening emergencies, dial 108.</span>
        </div>
      </div>
    </footer>
  );
}
