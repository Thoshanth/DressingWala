# Dressingwala — Project Plan

On-demand minor wound dressing service. Users request a doctor/nurse home visit via WhatsApp; a lightweight website supports discovery and trust but is not the primary transaction layer.

---

## 1. Concept Summary

- Users need minor medical dressing done at home: wounds, post-surgical care, diabetic ulcers, burns, stitch removal.
- They reach Dressingwala via WhatsApp (primary) or website (discovery/trust).
- A bot collects the request, matches the user with an available doctor/nurse nearby, and confirms the visit.
- Payment is collected digitally after the visit.
- Core backend: a doctor roster + dispatch logic, automated through WhatsApp.

---

## 2. Do We Need a Website? (Decision)

**Short answer: yes, but not on day one, and not as the primary booking channel.**

| Stage                        | Need                                                                                                                                                                                                                                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Validation (first 2-3 weeks) | WhatsApp number + a single link-in-bio style page is enough to test real demand. No need to over-build before knowing people will actually book.                                                                                                                                         |
| Early growth                 | A real lightweight website becomes necessary — for a medical service, trust matters more than for most on-demand categories. A stranger letting a doctor into their home wants to see credentials, service areas, and legitimacy first. WhatsApp alone reads as informal for healthcare. |
| Scale                        | Website also becomes your SEO/discovery surface — people searching "dressing doctor near me" need somewhere to land; WhatsApp isn't searchable.                                                                                                                                          |

**Conclusion**: build a small trust-and-discovery website that funnels everything into WhatsApp. The website is not where bookings happen — it's where people get convinced to message you.

---

## 3. How Customers Reach the Website

A website with no traffic source is just a digital brochure. Since you already own the domain (3-year registration in hand), it's worth using that time horizon for compounding SEO rather than just a launch asset.

| Channel                                           | How it drives traffic                                                                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Google Business Profile**                       | List Dressingwala as a home healthcare service with service areas — shows up in "near me" searches and Maps, free and high-intent                                                                          |
| **Local SEO (domain-based)**                      | Since the domain is locked in for 3 years, invest early in location-specific pages/content (e.g., "wound dressing at home in [area], Hyderabad") — SEO compounds over time, so starting now pays off later |
| **QR codes**                                      | Printed on flyers, pharmacy counters, clinic partnerships — scan straight to the WhatsApp deep-link, skipping the website entirely for low-friction conversion                                             |
| **Pharmacy/clinic partnerships**                  | Local pharmacies and small clinics are natural referral points — leave-behind cards with the WhatsApp number/QR                                                                                            |
| **Instagram/social (geo-tagged)**                 | Short-form content building trust (doctor intros, "how it works" reels) tagged to service areas                                                                                                            |
| **WhatsApp Business catalog + click-to-chat ads** | Meta ads that open directly into a WhatsApp conversation — highest-intent channel since it skips the website and lands straight in your booking flow                                                       |
| **Referral program**                              | Simple discount-for-referral once you have repeat customers (diabetic ulcer patients, post-surgical care are naturally recurring)                                                                          |
| **Google Ads**                                    | Worth testing once you have unit economics — bid on intent keywords like "dressing at home [city]"                                                                                                         |

**Priority for launch**: Google Business Profile + WhatsApp click-to-chat ads + QR codes at partner pharmacies. These are fast, cheap, and high-intent. SEO content and Instagram are slower-burn and worth starting in parallel since the domain is already secured long-term.

---

## 4. Legal & Compliance Checklist (lock down before taking paying customers)

- [ ] **Decide the care model**: doctors only, registered nurses only, or both. Affects legal framing, recruiting, and pricing. - Nurses: registered with Indian Nursing Council / state nursing council. - Doctors: registered with the respective State Medical Council.
- [ ] **Business structure**: operate as an aggregator/marketplace (doctors are independent, you dispatch to them) rather than a clinical establishment — lighter-weight to start.
- [ ] **Clinical Establishments (Registration and Regulation) Act, 2010** — check applicability state-by-state; relevant mainly if you run a fixed physical premise rather than a pure dispatch model.
- [ ] **Professional indemnity insurance** for doctors/nurses on the platform.
- [ ] **Terms & Conditions / disclaimer**: Dressingwala is a booking platform, not the care provider — clinical liability sits with the registered professional.
- [ ] **Data privacy (DPDP Act, IT Act 2000)** — patient data (name, address, condition) is sensitive; needs access control, not an open spreadsheet, even at MVP stage.
- [ ] **Consumer Protection Act, 2019** awareness for service-quality complaints.

---

## 5. Business Model

- **Revenue**: per-visit fee (flat or complexity-tiered) + optional subscription for recurring care (e.g., weekly diabetic ulcer dressing).
- **Doctor payout**: flat fee per visit vs. commission split — pick based on what motivates fast response.
- **Minimum viable density**: enough doctors in one pincode cluster to keep response time under ~30–45 minutes — this is the actual product promise.
- **Pricing transparency**: show "starting from ₹X" before booking confirmation to avoid disputes.

---

## 6. System Architecture

```
Customer (WhatsApp primary / Website secondary)
        ↓
Meta Cloud API → automation workflow (n8n)
        ↓
Dispatch Logic (Sheet MVP → database later)
        ↓
Doctor WhatsApp (Accept / Decline job offer)
        ↓
Status updates to customer + payment link
        ↓
Post-visit: review request + log
```

---

## 7. WhatsApp Booking Flow

1. User messages the WhatsApp number directly, or taps a `wa.me` link from the website.
2. Bot asks (buttons/list where possible):
   - Type of dressing needed
   - Location (pin or pincode)
   - Preferred time window
3. Automation filters the doctor roster by service type + area + availability.
4. Job offer sent to the matched doctor: _"New booking — [area], [time], [type] — Accept / Decline."_
5. No response within a timeout (5–10 min) → auto-reassign to next available doctor.
6. On accept → customer gets doctor name, ETA, payment link.
7. Status updates: "Doctor en route" → "Visit completed" → review request.
8. Every interaction logged for ops visibility.

---

## 8. Website Plan

**Purpose**: trust-building + discovery that funnels into WhatsApp. Not transactional — one funnel, all logic stays in WhatsApp.

### Pages (keep to 5–6 max)

| Page                          | Purpose                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| Home                          | Hero with value prop + WhatsApp CTA, 3-step how-it-works, trust signals                         |
| Services                      | Dressing types covered + starting price                                                         |
| How It Works                  | Visual flow: Message → Doctor Assigned → Visit → Pay                                            |
| Our Doctors                   | Photos/credentials of doctor pool — the single biggest trust-builder for a new healthcare brand |
| Service Areas                 | Pincodes/localities currently covered, to set expectations upfront                              |
| Contact / Sticky WhatsApp CTA | On every page — this is the real conversion point, not a form                                   |

### Design direction

Clean, clinical-but-warm: white/soft-blue palette, real doctor photos where possible, clear iconography per dressing type. Reference points: Urban Company, Practo.

### Build approach

- Static site, no custom backend — WhatsApp deep-link (`wa.me/<number>?text=...`) handles all dynamic logic.
- Lightweight enough to ship in days once content (doctor credentials, service area list) is ready.
- Basic analytics (e.g., GA4) to track WhatsApp click-through from the site.

---

## 9. MVP Tech Stack

| Piece                   | Tool                                                                           |
| ----------------------- | ------------------------------------------------------------------------------ |
| WhatsApp automation     | Meta Cloud API + automation workflow (n8n)                                     |
| Doctor/booking database | Spreadsheet (MVP) → proper database later                                      |
| Website                 | Static site, fast-build tool, free-tier hosting                                |
| Payments                | Payment links via WhatsApp (Razorpay/UPI)                                      |
| Dispatch logic          | Workflow filtering by pincode + service type + availability                    |
| Doctor-side app         | WhatsApp only at MVP — native app only once doctor count justifies it (15–20+) |
| Analytics               | GA4 / dashboard tool                                                           |

---

## 10. Build Roadmap

### Phase 0 — Validation (1 week, no website yet)

- WhatsApp number live, manual booking handling.
- Single link-in-bio page or nothing at all.
- Goal: confirm real people will book before building anything further.

### Phase 1 — Manual-Assisted MVP (2–3 weeks)

- WhatsApp bot collects requests.
- Ops manually assigns doctor from the roster.
- Lightweight trust website goes live with WhatsApp CTA wired in.

### Phase 2 — Automated Dispatch (3–4 weeks)

- Auto-match doctor by area + availability.
- Auto-send job offers with accept/decline.
- Timeout-and-reassign logic.
- Payment automation post-acceptance.

### Phase 3 — Scale Layer

- Doctor performance tracking (completion rate, ratings).
- Tiered pricing by complexity.
- Recurring-care subscriptions.
- Ops dashboard.
- Migrate from spreadsheet to proper database.
- Consider live doctor availability on the website only once volume justifies it.

---

## 11. Open Decisions to Lock Down Early

1. **Care model** — doctors, nurses, or both.
2. **Service area boundaries** — which pincodes to launch with.
3. **Pricing structure** — flat vs. complexity-tiered vs. distance-based.
4. **Doctor payout structure** — flat fee vs. commission.
5. **Insurance/indemnity** — in place before first paid booking.

---

## 12. Next Steps

- [ ] Lock legal/compliance checklist (Section 3) with a lawyer.
- [ ] Run Phase 0 validation — WhatsApp number live, no website, see if bookings come in.
- [ ] Recruit initial doctor/nurse pool, collect credentials + photos.
- [ ] Build WhatsApp automation workflow (Phase 1).
- [ ] Build lightweight trust website (Home, Services, How It Works, Our Doctors, Service Areas).
- [ ] Wire WhatsApp deep-link CTA into website.
- [ ] Set up doctor roster + booking log (spreadsheet to start).
- [ ] Set up payment links.
- [ ] Soft-launch in one service area cluster before expanding.

---

## 13. Lovable Build Prompt

Copy-paste this directly into Lovable to generate the site.

```
Build a one-page (with section anchors) website for "Dressingwala" — an on-demand
home wound dressing service in Hyderabad, India. Users book a doctor or nurse to
come to their home for wound dressing, post-surgical care, diabetic ulcer
management, burns, or stitch removal. The entire booking flow happens on
WhatsApp — this website's only job is to build trust and push visitors to
WhatsApp. Do not build a booking form or backend.

DESIGN DIRECTION
Tone: warm, calm, medically credible — not sterile-hospital, not gig-economy-app.
Think "a doctor you trust is coming to your home," not "on-demand delivery."

Color palette (use these exact values):
- Background base: #FAF7F2 (warm linen white)
- Primary/deep accent: #2F5D50 (healing teal-green)
- Secondary surface: #E8DDD0 (soft gauze beige)
- CTA accent: #D9694F (warm terracotta — used only for primary actions)
- Text: #1F2A24 (deep charcoal-green)

Typography:
- Display/headline font: a warm humanist serif (Fraunces or similar) — used for
  headlines only, with restraint
- Body font: a clean grotesk sans (Inter or similar)
- Utility font (for ETAs, service area codes, small labels): a monospace face

Signature design element: a thin, hand-drawn-style "stitch line" (like a suture)
used as the section divider between major sections instead of generic horizontal
rules. This should feel like a deliberate nod to the dressing/wound-care theme,
not decorative for its own sake. Keep it subtle — one or two strokes, not busy.

Avoid generic AI-template patterns: no numbered 01/02/03 icon grids unless the
content is a genuine sequence (the "how it works" steps ARE a genuine sequence,
so numbering is fine there), no stock gradient-blob backgrounds, no cookie-cutter
hero with big stat + small label.

SECTIONS (single scrolling page with anchor nav)

1. Hero
   - Headline: something like "A doctor at your door, not a queue at the clinic."
     (Write 2-3 alternative headline options in this voice — warm, plain,
     confidence-building, no corporate jargon.)
   - Subhead: one sentence on what the service does and the response-time promise
     (e.g., "Book a verified doctor or nurse for wound dressing — at home, usually
     within 30-45 minutes.")
   - Primary CTA button: "Book on WhatsApp" — links to
     https://wa.me/<PHONE_NUMBER>?text=Hi%2C%20I%20need%20a%20dressing%20booking
     (use a placeholder number, I'll swap it in)
   - This CTA button style repeats as the sticky/floating action across the
     whole page (fixed position on mobile scroll)

2. How It Works
   - 3-4 step sequence: Message us on WhatsApp → Get matched with a nearby
     doctor/nurse → They visit your home → Pay after the visit
   - This is a genuine sequence, so numbered steps are appropriate here

3. Services
   - Cards or list for: Wound Dressing, Post-Surgical Care, Diabetic Ulcer Care,
     Burn Dressing, Stitch Removal, Other Minor Care
   - Each with a one-line description and "starting from ₹___" placeholder pricing

4. Our Doctors
   - Grid of doctor/nurse profile cards: photo placeholder, name, credential
     (e.g., "Registered Nurse, 6 yrs experience"), specialty tag
   - Use 4-6 placeholder profiles I can replace with real data later
   - This section should do the heaviest trust-building work on the page —
     give it real visual weight, not an afterthought grid

5. Service Areas
   - List/map-style display of localities currently covered (placeholder list
     of Hyderabad areas, e.g., Banjara Hills, Jubilee Hills, Gachibowli,
     Madhapur — clearly marked as "currently serving," with a note that more
     areas are being added)

6. Trust/Safety section
   - Short section addressing the obvious hesitation: "Is this safe? Who are
     these doctors?" — cover verification, registration, professional
     indemnity in plain reassuring language (not legal-document tone)

7. Footer
   - WhatsApp CTA repeated, contact info, service area reminder, basic legal
     links (Terms, Privacy — can be placeholder pages)

TECHNICAL NOTES
- Fully responsive, mobile-first (most traffic will be mobile users finding
  this via WhatsApp/social/QR codes)
- Sticky WhatsApp CTA button visible on scroll on mobile
- Fast-loading, no heavy unnecessary animation — one tasteful scroll-reveal
  moment is enough, not animation on every element
- Visible keyboard focus states or accessibility
- All WhatsApp links use the wa.me deep-link format with pre-filled message text
- Use placeholder content (doctor names, photos, pricing) clearly marked as
  placeholders so I can swap in real data
```

Before pasting into Lovable: swap in your actual WhatsApp number in the `wa.me` links, and have at least placeholder doctor names/credentials ready since that section does the most trust-building work on the page.
