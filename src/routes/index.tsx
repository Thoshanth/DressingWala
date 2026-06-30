import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";
import doc4 from "@/assets/doctor-4.jpg";
import doc5 from "@/assets/doctor-5.jpg";
import doc6 from "@/assets/doctor-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dressingwala — Home wound dressing in Hyderabad" },
      {
        name: "description",
        content:
          "Book a verified doctor or nurse for wound dressing at home in Hyderabad — usually within 30–45 minutes. Booking happens entirely on WhatsApp.",
      },
      { property: "og:title", content: "Dressingwala — Home wound dressing in Hyderabad" },
      {
        property: "og:description",
        content:
          "A doctor at your door, not a queue at the clinic. Verified home wound care across Hyderabad.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "910000000000"; // PLACEHOLDER — swap with real number
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I need a dressing booking",
)}`;

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 1.7.4 3.4 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.4 0 9.8-4.4 9.8-9.8S17.4 2.2 12 2.2zm0 17.8c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.3-3-1.3-4.6 0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.5-8 8.5z" />
    </svg>
  );
}

function StitchLine({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center py-12 md:py-20 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 24" className="w-full max-w-3xl" preserveAspectRatio="none">
        <path
          d="M0 12 Q 150 4, 300 12 T 600 12"
          fill="none"
          stroke="#2F5D50"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          strokeDasharray="10 8"
          strokeLinecap="round"
        />
        <path
          d="M0 12 Q 150 4, 300 12 T 600 12"
          fill="none"
          stroke="#D9694F"
          strokeOpacity="0.5"
          strokeWidth="0.8"
          strokeDasharray="2 16"
          strokeDashoffset="-1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function CTAButton({
  children,
  size = "md",
  className = "",
}: {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-base md:text-lg",
  };
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full bg-[#D9694F] font-medium text-[#FAF7F2] shadow-[0_8px_24px_-12px_rgba(217,105,79,0.6)] transition-all hover:bg-[#c45a42] hover:shadow-[0_12px_28px_-10px_rgba(217,105,79,0.7)] active:translate-y-px ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      {children ?? "Book on WhatsApp"}
    </a>
  );
}

const services = [
  {
    name: "Wound Dressing",
    desc: "Clean dressing changes for fresh or chronic wounds.",
    price: "₹499",
  },
  {
    name: "Post-Surgical Care",
    desc: "Sterile dressing and monitoring after a procedure.",
    price: "₹699",
  },
  {
    name: "Diabetic Ulcer Care",
    desc: "Specialist care for diabetic foot ulcers and pressure sores.",
    price: "₹799",
  },
  {
    name: "Burn Dressing",
    desc: "Gentle dressing for minor and moderate burn injuries.",
    price: "₹699",
  },
  {
    name: "Stitch Removal",
    desc: "Safe suture removal at the right time, in the comfort of home.",
    price: "₹399",
  },
  {
    name: "Other Minor Care",
    desc: "Injections, catheter care, IV line monitoring and more.",
    price: "₹449",
  },
];

const doctors = [
  { img: doc1, name: "Dr. Aanya Reddy", cred: "MBBS, General Practice · 8 yrs", tag: "Wound Care" },
  { img: doc2, name: "Dr. Rohan Mehta", cred: "MBBS, MS · 12 yrs", tag: "Post-Surgical" },
  { img: doc3, name: "Sister Priya Nair", cred: "Registered Nurse · 6 yrs", tag: "Diabetic Ulcer" },
  { img: doc4, name: "Arjun Kumar, RN", cred: "Registered Nurse · 5 yrs", tag: "Burn Dressing" },
  {
    img: doc5,
    name: "Dr. Lakshmi Iyer",
    cred: "MBBS, Diabetology · 18 yrs",
    tag: "Chronic Wounds",
  },
  { img: doc6, name: "Vikas Sharma, RN", cred: "Registered Nurse · 4 yrs", tag: "Stitch Removal" },
];

const areas = [
  "Banjara Hills",
  "Jubilee Hills",
  "Gachibowli",
  "Madhapur",
  "Hitech City",
  "Kondapur",
  "Kukatpally",
  "Begumpet",
  "Somajiguda",
  "Ameerpet",
  "Manikonda",
  "Financial District",
];

function Index() {
  const nav = [
    { href: "#how", label: "How it works" },
    { href: "#services", label: "Services" },
    { href: "#doctors", label: "Our doctors" },
    { href: "#areas", label: "Areas" },
    { href: "#trust", label: "Safety" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2A24]">
      <header className="sticky top-0 z-40 border-b border-[#E8DDD0]/70 bg-[#FAF7F2]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-xl text-[#2F5D50] md:text-2xl">Dressingwala</span>
            <span className="hidden font-mono-ui text-[10px] uppercase tracking-widest text-[#2F5D50]/60 sm:inline">
              HYD
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-[#1F2A24]/75 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-[#2F5D50]">
                {n.label}
              </a>
            ))}
          </nav>
          <CTAButton size="sm" className="hidden md:inline-flex">
            Book on WhatsApp
          </CTAButton>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 md:grid-cols-12 md:gap-10 md:px-8 md:pb-24 md:pt-20">
          <div className="md:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2F5D50]/15 bg-[#E8DDD0]/50 px-3 py-1.5 font-mono-ui text-[11px] uppercase tracking-widest text-[#2F5D50]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F5D50]" /> Now serving Hyderabad
            </div>
            <h1 className="font-display text-4xl leading-[1.08] text-[#1F2A24] sm:text-5xl md:text-[64px] md:leading-[1.05]">
              A doctor at your door,
              <br className="hidden sm:inline" />{" "}
              <span className="italic text-[#2F5D50]">not a queue</span> at the clinic.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#1F2A24]/75">
              Book a verified doctor or nurse for wound dressing — at home, usually within{" "}
              <span className="font-mono-ui text-[15px] text-[#2F5D50]">30–45 min</span>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CTAButton size="lg" />
              <a
                href="#how"
                className="text-sm text-[#1F2A24]/70 underline-offset-4 hover:text-[#2F5D50] hover:underline"
              >
                How it works →
              </a>
            </div>
            <p className="mt-5 font-mono-ui text-xs uppercase tracking-wider text-[#1F2A24]/55">
              Pay after the visit · No app to download
            </p>
          </div>

          <div className="relative md:col-span-5">
            <div className="relative overflow-hidden rounded-[28px] border border-[#E8DDD0] shadow-[0_30px_80px_-40px_rgba(47,93,80,0.35)]">
              <img
                src={heroImg}
                alt="A caregiver gently applying a fresh gauze dressing in a sunlit home"
                width={1024}
                height={1024}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#E8DDD0] bg-[#FAF7F2] px-4 py-3 shadow-lg sm:block">
              <div className="font-mono-ui text-[10px] uppercase tracking-widest text-[#2F5D50]/70">
                Avg. response
              </div>
              <div className="font-display text-2xl text-[#2F5D50]">32 min</div>
            </div>
          </div>
        </div>
      </section>

      <StitchLine />

      <section id="how" className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="font-mono-ui text-xs uppercase tracking-widest text-[#2F5D50]/70">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl text-[#1F2A24] md:text-4xl">
            Four steps. No forms, no calls.
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Message us on WhatsApp",
              d: "Tell us what you need in a sentence — a photo helps.",
            },
            {
              t: "Get matched with a nearby pro",
              d: "A verified doctor or nurse in your area takes the case.",
            },
            {
              t: "They visit your home",
              d: "Usually within 30–45 minutes, with sterile supplies.",
            },
            {
              t: "Pay after the visit",
              d: "Cash, UPI or card. You only pay once you're cared for.",
            },
          ].map((s, i) => (
            <li key={s.t} className="relative rounded-2xl border border-[#E8DDD0] bg-[#FAF7F2] p-6">
              <div className="font-mono-ui text-xs tracking-widest text-[#D9694F]">
                STEP {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-xl text-[#1F2A24]">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1F2A24]/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <StitchLine />

      <section id="services" className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono-ui text-xs uppercase tracking-widest text-[#2F5D50]/70">
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#1F2A24] md:text-4xl">
              Careful, clinical home care.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[#1F2A24]/65">
            Prices are starting points. We'll confirm the cost on WhatsApp after we understand your
            case.
          </p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#E8DDD0] bg-[#E8DDD0] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="group bg-[#FAF7F2] p-7 transition-colors hover:bg-[#FAF7F2]/60"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl text-[#1F2A24]">{s.name}</h3>
                <span className="whitespace-nowrap font-mono-ui text-xs text-[#2F5D50]">
                  from {s.price}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#1F2A24]/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <StitchLine />

      <section id="doctors" className="bg-[#E8DDD0]/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="font-mono-ui text-xs uppercase tracking-widest text-[#2F5D50]/70">
              Our doctors & nurses
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#1F2A24] md:text-5xl">
              Real people. Verified credentials. Coming to your home.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#1F2A24]/70">
              Every clinician on Dressingwala is registered with their respective council,
              background-checked, and trained in home dressing protocols. You'll know who's coming
              before they arrive.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => (
              <article key={d.name} className="group">
                <div className="relative overflow-hidden rounded-[20px] border border-[#E8DDD0] bg-[#FAF7F2] shadow-[0_20px_60px_-40px_rgba(31,42,36,0.5)]">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#FAF7F2]/90 px-3 py-1 font-mono-ui text-[10px] uppercase tracking-widest text-[#2F5D50] backdrop-blur">
                    {d.tag}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg text-[#1F2A24]">{d.name}</h3>
                  <p className="mt-1 text-sm text-[#1F2A24]/65">{d.cred}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 font-mono-ui text-[11px] uppercase tracking-widest text-[#1F2A24]/45">
            * Placeholder profiles — to be replaced with real team data.
          </p>
        </div>
      </section>

      <StitchLine />

      <section id="areas" className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono-ui text-xs uppercase tracking-widest text-[#2F5D50]/70">
              Service areas
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#1F2A24] md:text-4xl">
              Currently serving across Hyderabad.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#1F2A24]/70">
              We're expanding every week. Don't see your area? Message us anyway — chances are we
              can still help, or we'll tell you when we'll reach you.
            </p>
          </div>
          <div className="md:col-span-7">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#E8DDD0] bg-[#E8DDD0] sm:grid-cols-3">
              {areas.map((a, i) => (
                <li
                  key={a}
                  className="flex items-center justify-between bg-[#FAF7F2] px-4 py-4 text-sm text-[#1F2A24]"
                >
                  <span>{a}</span>
                  <span className="font-mono-ui text-[10px] tracking-widest text-[#2F5D50]/55">
                    HYD-{String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <StitchLine />

      <section id="trust" className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="rounded-3xl bg-[#2F5D50] px-6 py-14 text-[#FAF7F2] md:px-14 md:py-20">
          <div className="max-w-2xl">
            <p className="font-mono-ui text-xs uppercase tracking-widest text-[#FAF7F2]/60">
              Is this safe?
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#FAF7F2] md:text-4xl">
              The short answer: yes — and here's why.
            </h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                t: "Verified clinicians",
                d: "Every doctor and nurse is registered with their state medical or nursing council. We check originals — not just digital copies.",
              },
              {
                t: "Background-checked",
                d: "Police verification, address proof and reference checks before anyone steps into a patient's home.",
              },
              {
                t: "Insured & accountable",
                d: "Professional indemnity cover on every visit. You'll always know the name and ID of the person at your door.",
              },
            ].map((b) => (
              <div key={b.t}>
                <h3 className="font-display text-xl text-[#FAF7F2]">{b.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#FAF7F2]/75">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <CTAButton size="lg">Talk to us on WhatsApp</CTAButton>
          </div>
        </div>
      </section>

      <footer className="mt-24 border-t border-[#E8DDD0] bg-[#FAF7F2]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-display text-2xl text-[#2F5D50]">Dressingwala</div>
              <p className="mt-3 max-w-sm text-sm text-[#1F2A24]/70">
                On-demand home wound dressing across Hyderabad. Booked entirely on WhatsApp.
              </p>
              <div className="mt-6">
                <CTAButton />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="font-mono-ui text-[11px] uppercase tracking-widest text-[#2F5D50]/70">
                Contact
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[#1F2A24]/75">
                <li>
                  WhatsApp: <span className="font-mono-ui">+91 00000 00000</span>
                </li>
                <li>care@dressingwala.in</li>
                <li>Hyderabad, Telangana</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono-ui text-[11px] uppercase tracking-widest text-[#2F5D50]/70">
                Sections
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#how" className="text-[#1F2A24]/75 hover:text-[#2F5D50]">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-[#1F2A24]/75 hover:text-[#2F5D50]">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#doctors" className="text-[#1F2A24]/75 hover:text-[#2F5D50]">
                    Our doctors
                  </a>
                </li>
                <li>
                  <a href="#areas" className="text-[#1F2A24]/75 hover:text-[#2F5D50]">
                    Areas
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono-ui text-[11px] uppercase tracking-widest text-[#2F5D50]/70">
                Legal
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-[#1F2A24]/75 hover:text-[#2F5D50]">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#1F2A24]/75 hover:text-[#2F5D50]">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#E8DDD0] pt-6 font-mono-ui text-[11px] uppercase tracking-widest text-[#1F2A24]/50 md:flex-row">
            <span>© {new Date().getFullYear()} Dressingwala</span>
            <span>Made with care in Hyderabad</span>
          </div>
        </div>
      </footer>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:hidden">
        <CTAButton size="md" className="pointer-events-auto shadow-2xl" />
      </div>
    </div>
  );
}
