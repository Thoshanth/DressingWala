export type ServicePage = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  targetKeywords: string[];
  intro: string[]; // array of paragraphs
  whoItsFor: string[]; // bullets
  whatTheNurseDoes: string[]; // bullets
  procedureSteps: { title: string; desc: string }[];
  howOftenChanged: string;
  warningSigns: string[]; // bullets
  emergencyNotice: boolean;
  priceNote: string;
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  reviewedBy: { name: string; credentials: string } | null;
};

export const servicePages: ServicePage[] = [
  {
    slug: "simple-wound-dressing-hyderabad",
    path: "/simple-wound-dressing-hyderabad",
    metaTitle: "Simple Wound Dressing at Home in Hyderabad | DressingWala",
    metaDescription: "Professional simple wound dressing at home in Hyderabad. Safe, sterile care for cuts, abrasions, and minor injuries.",
    h1: "Simple Wound Dressing at Home in Hyderabad",
    targetKeywords: ["wound dressing", "simple wound care"],
    intro: [
      "Even minor cuts and abrasions require proper sterile care to prevent infection and ensure quick healing. DressingWala offers professional simple wound dressing services right at your doorstep in Hyderabad.",
      "Our trained nurses use standard sterile techniques to manage your minor injuries, ensuring your wounds heal in a safe environment."
    ],
    whoItsFor: [
      "Individuals with minor cuts, abrasions, or scrapes.",
      "Patients needing regular sterile dressing changes.",
      "Anyone who wants to avoid hospital visits for simple wound care."
    ],
    whatTheNurseDoes: [
      "Cleans the wound gently with appropriate sterile solutions.",
      "Assesses the wound for any signs of infection.",
      "Applies standard sterile dressings.",
      "Provides advice on keeping the area protected."
    ],
    procedureSteps: [
      { title: "Assessment", desc: "Checking the wound for any signs of infection." },
      { title: "Cleansing", desc: "Removing debris and cleaning the wound bed safely." },
      { title: "Dressing", desc: "Applying the correct sterile dressing." },
      { title: "Advice", desc: "Guiding the patient on daily care." }
    ],
    howOftenChanged: "Dressing changes for simple wounds vary. Minor injuries may require changes every few days. We follow your physician's exact schedule or standard protocols.",
    warningSigns: [
      "Increased redness or warmth around the wound.",
      "A foul odor or increased pus.",
      "Rapidly spreading redness.",
      "Fever."
    ],
    emergencyNotice: false,
    priceNote: "₹599",
    faqs: [
      { q: "Is home care safe for minor wounds?", a: "Yes, provided it is done by a trained professional using sterile techniques." },
      { q: "What kind of dressings do you use?", a: "We use appropriate standard sterile dressings." },
      { q: "How soon can a nurse arrive?", a: "We typically reach most Hyderabad locations within 60-120 minutes." },
      { q: "Do you bring the dressing materials?", a: "Yes, we carry sterile single-use kits and standard dressings." }
    ],
    relatedSlugs: ["post-surgery-dressing-hyderabad"],
    reviewedBy: null
  },
  {
    slug: "diabetic-foot-wound-hyderabad",
    path: "/diabetic-foot-wound-hyderabad",
    metaTitle: "Diabetic Foot Wound Dressing at Home in Hyderabad | DressingWala",
    metaDescription: "Expert diabetic foot wound dressing at home in Hyderabad. Safe, sterile care by verified nurses.",
    h1: "Diabetic Foot Wound Dressing at Home in Hyderabad",
    targetKeywords: ["diabetic foot dressing", "diabetic ulcer care"],
    intro: [
      "Diabetic foot wounds require specialized care, where healing can be slow and the risk of infection is high. DressingWala offers expert diabetic foot dressing services right at your doorstep in Hyderabad.",
      "Our trained nurses use advanced sterile techniques to manage chronic diabetic foot ulcers, ensuring your wounds heal in a safe environment."
    ],
    whoItsFor: [
      "Diabetic patients with foot ulcers or sores.",
      "Individuals needing regular diabetic wound monitoring.",
      "Patients recovering from minor diabetic foot procedures."
    ],
    whatTheNurseDoes: [
      "Assesses the foot wound for healing progress or infection.",
      "Cleans the wound gently with appropriate sterile solutions.",
      "Applies specialized dressings designed for diabetic wounds.",
      "Provides advice on keeping the area elevated and protected."
    ],
    procedureSteps: [
      { title: "Assessment", desc: "Checking the wound for any signs of worsening or infection." },
      { title: "Cleansing", desc: "Removing debris and cleaning the wound bed safely." },
      { title: "Dressing", desc: "Applying the correct dressing type as prescribed." },
      { title: "Offloading Advice", desc: "Guiding the patient on how to relieve pressure from the affected foot." }
    ],
    howOftenChanged: "Diabetic ulcers might need frequent changes, sometimes daily. We follow your physician's exact schedule.",
    warningSigns: [
      "Black or dead tissue appearing in the wound.",
      "A foul odor or increased pus.",
      "Rapidly spreading redness or swelling.",
      "Loss of sensation or extreme pain."
    ],
    emergencyNotice: false,
    priceNote: "₹799",
    faqs: [
      { q: "Is home care safe for diabetic foot ulcers?", a: "Yes, provided it is done by a trained professional using sterile techniques." },
      { q: "What kind of dressings do you use for diabetic foot?", a: "We use standard sterile dressings. For specific advanced dressings, we can provide them at MRP based on your doctor's advice." },
      { q: "Should I keep my leg elevated?", a: "Yes, elevating the leg often helps reduce swelling, but always follow your doctor's specific advice." },
      { q: "Are your nurses trained in diabetic care?", a: "Yes, our nurses are experienced in diabetic wound management." }
    ],
    relatedSlugs: ["simple-wound-dressing-hyderabad"],
    reviewedBy: null
  },
  {
    slug: "post-surgery-dressing-hyderabad",
    path: "/post-surgery-dressing-hyderabad",
    metaTitle: "Post Surgery Dressing at Home in Hyderabad | DressingWala",
    metaDescription: "Professional post-surgery wound dressing at home in Hyderabad. Verified nurses for surgery wound care and drain checks.",
    h1: "Post Surgery Dressing at Home in Hyderabad",
    targetKeywords: ["operation dressing", "surgery wound dressing"],
    intro: [
      "Recovering from surgery is a critical time, and proper wound care is essential to prevent infections. DressingWala brings professional post-surgery dressing services directly to your home in Hyderabad.",
      "Whether you've had orthopedic surgery, abdominal surgery, or minor procedures, our verified nurses follow strict sterile techniques."
    ],
    whoItsFor: [
      "Patients recovering from recent surgeries.",
      "Individuals requiring regular surgical wound cleaning.",
      "Patients who need drain checks."
    ],
    whatTheNurseDoes: [
      "Carefully removes the old dressing using aseptic techniques.",
      "Cleans the surgical wound with sterile solutions.",
      "Inspects the wound for any signs of infection.",
      "Applies a fresh, sterile dressing."
    ],
    procedureSteps: [
      { title: "Preparation", desc: "The nurse prepares a sterile field and gathers all materials." },
      { title: "Removal", desc: "Old dressings are gently removed." },
      { title: "Cleaning", desc: "The wound is cleaned thoroughly." },
      { title: "Application", desc: "A new dressing is applied securely." }
    ],
    howOftenChanged: "The frequency of dressing changes depends entirely on your surgeon's instructions.",
    warningSigns: [
      "Increased redness or warmth.",
      "Excessive discharge.",
      "Fever or chills.",
      "Unusual pain at the surgical site."
    ],
    emergencyNotice: false,
    priceNote: "₹899",
    faqs: [
      { q: "Do you provide the dressing materials?", a: "We bring standard sterile kits." },
      { q: "Can you check surgical drains?", a: "Yes, our nurses can check and empty surgical drains if instructed by your doctor." },
      { q: "How do I book a home visit?", a: "You can easily book through our WhatsApp assistant." },
      { q: "Are the nurses qualified?", a: "Absolutely. All our nurses are registered and background-verified." }
    ],
    relatedSlugs: ["suture-staple-removal-hyderabad"],
    reviewedBy: null
  },
  {
    slug: "suture-staple-removal-hyderabad",
    path: "/suture-staple-removal-hyderabad",
    metaTitle: "Suture / Staple Removal at Home in Hyderabad | DressingWala",
    metaDescription: "Professional and painless suture or staple removal at home in Hyderabad. Safe care by verified nurses.",
    h1: "Suture / Staple Removal at Home in Hyderabad",
    targetKeywords: ["suture removal", "staple removal"],
    intro: [
      "Once your surgical wound has healed adequately, sutures or staples need to be removed. Doing this at home saves you a stressful trip to the hospital. DressingWala offers professional suture and staple removal services in Hyderabad.",
      "Our nurses ensure the procedure is done gently, cleanly, and safely, exactly as per your surgeon's clearance."
    ],
    whoItsFor: [
      "Patients who have received clearance from their surgeon for suture removal.",
      "Individuals needing staple removal after orthopedic or general surgery.",
      "Anyone who prefers the comfort of home for this procedure."
    ],
    whatTheNurseDoes: [
      "Verifies the surgeon's clearance for removal.",
      "Cleans the area with sterile solutions.",
      "Gently removes sutures or staples using specialized sterile tools.",
      "Applies steri-strips or a light dressing if required."
    ],
    procedureSteps: [
      { title: "Verification", desc: "Checking the doctor's note for clearance." },
      { title: "Cleansing", desc: "Sterilizing the wound area." },
      { title: "Removal", desc: "Carefully extracting sutures or staples." },
      { title: "Aftercare", desc: "Applying protective steri-strips if needed." }
    ],
    howOftenChanged: "This is typically a one-time procedure once the wound is healed.",
    warningSigns: [
      "Wound opening up after removal.",
      "Bleeding from the site.",
      "Signs of underlying infection.",
      "Severe pain."
    ],
    emergencyNotice: false,
    priceNote: "₹999",
    faqs: [
      { q: "Does suture removal hurt?", a: "It is generally painless, though you may feel a slight pulling sensation." },
      { q: "Do I need a doctor's prescription?", a: "Yes, we require clearance from your treating doctor to remove sutures or staples." },
      { q: "What if the wound is not fully healed?", a: "If the nurse observes the wound is not fully healed, they will advise against removal and contact your doctor." },
      { q: "Do you use sterile tools?", a: "Yes, we use single-use sterile suture and staple removal kits." }
    ],
    relatedSlugs: ["post-surgery-dressing-hyderabad"],
    reviewedBy: null
  },
  {
    slug: "complex-large-wounds-hyderabad",
    path: "/complex-large-wounds-hyderabad",
    metaTitle: "Complex & Large Wound Dressing at Home in Hyderabad | DressingWala",
    metaDescription: "Professional nursing care for complex and large wounds at home in Hyderabad. Strict aseptic dressing changes.",
    h1: "Complex / Large Wounds Dressing at Home in Hyderabad",
    targetKeywords: ["complex wound dressing", "large wound care", "burns dressing"],
    intro: [
      "Complex wounds, large open wounds, trauma, and burns require meticulous and highly specialized care to prevent infection and support tissue regeneration. DressingWala provides expert complex wound care at home in Hyderabad.",
      "Our experienced nurses handle these wounds with strict aseptic techniques, ensuring a safe environment for healing while closely monitoring for complications."
    ],
    whoItsFor: [
      "Patients with large open wounds or severe trauma wounds.",
      "Individuals recovering from extensive burns.",
      "Patients requiring frequent, complex packing and dressing."
    ],
    whatTheNurseDoes: [
      "Performs complex wound packing and cleaning under strict sterile conditions.",
      "Monitors the wound bed closely for any signs of infection.",
      "Applies advanced dressings as prescribed to manage high levels of exudate.",
      "Communicates closely with the patient regarding any concerning symptoms."
    ],
    procedureSteps: [
      { title: "Aseptic Preparation", desc: "Setting up a completely sterile field." },
      { title: "Deep Cleansing", desc: "Thoroughly irrigating the large wound cavity." },
      { title: "Packing", desc: "Carefully packing the wound with prescribed materials." },
      { title: "Secure Dressing", desc: "Applying a secure outer dressing to absorb fluids." }
    ],
    howOftenChanged: "Complex wounds often require daily or even twice-daily dressing changes.",
    warningSigns: [
      "Return of severe, out-of-proportion pain.",
      "New areas of discolored skin.",
      "Foul odor or increased drainage.",
      "Fever or dizziness."
    ],
    emergencyNotice: true,
    priceNote: "₹1,199",
    faqs: [
      { q: "Is it safe to manage large wounds at home?", a: "Yes, our nurses follow the hospital's exact discharge protocols for sterile home care." },
      { q: "What if the nurse sees something concerning?", a: "If our nurse identifies any warning signs, they will immediately inform you and advise an urgent visit to the doctor." },
      { q: "Are the nurses experienced with burns?", a: "Yes, we deploy our most experienced nurses for complex cases." },
      { q: "Do you use advanced dressings?", a: "We apply the specific advanced dressings ordered by your treating physician." }
    ],
    relatedSlugs: ["diabetic-foot-wound-hyderabad"],
    reviewedBy: null
  }
];
