export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // array of html or markdown strings
  author: string;
  reviewer: string | null;
  reviewerCredentials: string | null;
  datePublished: string;
  dateModified: string;
  category: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "diabetic-foot-ulcers-home-care",
    title: "Understanding Diabetic Foot Ulcers: Causes, Symptoms, and Care",
    excerpt: "Diabetic foot ulcers are a severe complication of diabetes. Learn how proper wound care at home can prevent infections and speed up recovery.",
    content: [
      "<p>Diabetic foot ulcers are one of the most common complications of uncontrolled diabetes, affecting nearly 15% of diabetic patients. These open sores typically occur on the bottom of the foot and can lead to severe infections or even amputation if not treated promptly.</p>",
      "<h3>Why Do Diabetic Foot Ulcers Form?</h3>",
      "<p>The formation of foot ulcers is usually a combination of poor circulation (peripheral artery disease), nerve damage (neuropathy), and foot deformities. Neuropathy causes a loss of sensation, meaning a simple blister or cut can go unnoticed until it becomes a deep, infected ulcer.</p>",
      "<h3>Recognizing the Symptoms</h3>",
      "<p>Early detection is vital. Look out for:</p><ul><li>Drainage or pus on your socks.</li><li>Unusual swelling, redness, or warmth.</li><li>A foul odor emanating from the foot.</li><li>Blackened tissue (eschar) surrounding the sore.</li></ul>",
      "<h3>Professional Home Care</h3>",
      "<p>While minor cuts can be managed with basic first aid, a diabetic foot ulcer requires professional medical intervention. Treatment involves debridement (removing dead tissue), infection management, and 'offloading' to take pressure off the foot.</p>",
      "<p>For patients in Hyderabad, <b>DressingWala</b> provides specialized at-home dressing services. Our verified nurses use advanced sterile techniques and apply specific dressings (like hydrocolloids or foams) as prescribed by your doctor to maintain an optimal healing environment.</p>",
      "<h3>Prevention is Key</h3>",
      "<p>Inspect your feet daily, wash them in lukewarm water, and never walk barefoot. Always wear well-fitting shoes and keep your blood sugar under control. If you notice any abnormalities, contact your healthcare provider immediately.</p>"
    ],
    author: "Dr. Sandhya R.",
    reviewer: "Dr. Sandhya R.",
    reviewerCredentials: "MBBS, MD",
    datePublished: "2023-10-12",
    dateModified: "2023-10-12",
    category: "Diabetic Care",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
  },
  {
    id: 2,
    slug: "sterile-technique-post-surgery-dressing",
    title: "The Importance of Sterile Technique in Post-Surgery Wound Dressing",
    excerpt: "Why is a sterile environment crucial for post-operative care? Discover the best practices our nurses follow to ensure you heal safely.",
    content: [
      "<p>Returning home after surgery is a relief, but the recovery process has just begun. One of the most critical aspects of post-operative care is wound dressing. Ensuring the surgical site remains clean is paramount to preventing Surgical Site Infections (SSIs).</p>",
      "<h3>What is Sterile Technique?</h3>",
      "<p>Sterile technique (or aseptic technique) refers to a set of specific practices performed under carefully controlled conditions to minimize contamination by pathogens. It involves the use of sterile gloves, instruments, and dressings.</p>",
      "<h3>Why is it Crucial at Home?</h3>",
      "<p>Hospitals are highly controlled environments, but homes contain everyday bacteria. An open surgical wound is highly susceptible to these pathogens. An infection can delay healing, increase scarring, or even necessitate a return to the hospital.</p>",
      "<h3>How DressingWala Ensures Sterility</h3>",
      "<ul><li><b>Hand Hygiene:</b> Strict handwashing and the use of sanitizers before touching any equipment.</li><li><b>Sterile Field:</b> Setting up a clean area using a sterile drape where all instruments are placed.</li><li><b>Single-Use Kits:</b> We exclusively use disposable, pre-sterilized dressing kits that are opened only at the patient's bedside.</li><li><b>No-Touch Technique:</b> The wound bed is never touched directly with bare hands or unsterilized materials.</li></ul>",
      "<p>By trusting professionals to handle your post-surgery dressings, you significantly reduce the risk of complications and ensure a smoother, faster recovery.</p>"
    ],
    author: "Sr. Anitha R.",
    reviewer: "Dr. Vivek M.",
    reviewerCredentials: "MS General Surgery",
    datePublished: "2023-09-28",
    dateModified: "2023-09-28",
    category: "Post-Op Recovery",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80"
  },
  {
    id: 3,
    slug: "managing-pressure-sores-bedridden",
    title: "Managing Pressure Sores for Bedridden Patients",
    excerpt: "Bedsores can develop quickly and be painful. Read our comprehensive guide on preventing and treating pressure ulcers at home.",
    content: [
      "<p>Pressure sores, also known as bedsores or decubitus ulcers, are injuries to the skin and underlying tissue resulting from prolonged pressure on the skin. They are a significant concern for individuals who are bedridden or use a wheelchair.</p>",
      "<h3>How Do Pressure Sores Develop?</h3>",
      "<p>When a person stays in one position for too long, the pressure cuts off blood supply to the skin. Without blood, the skin tissue dies. Common areas include the heels, ankles, hips, and tailbone.</p>",
      "<h3>The Stages of Bedsores</h3>",
      "<p>Pressure sores develop in four stages, ranging from mild redness (Stage I) to severe tissue damage that exposes muscle or bone (Stage IV). Catching them early is critical for successful treatment.</p>",
      "<h3>Prevention Strategies</h3>",
      "<ul><li><b>Frequent Repositioning:</b> Turn the patient every two hours to relieve pressure.</li><li><b>Support Surfaces:</b> Use specialized air mattresses or cushions.</li><li><b>Skin Care:</b> Keep the skin clean and dry. Apply barrier creams to protect against moisture from incontinence.</li><li><b>Nutrition:</b> A high-protein diet supports skin health and tissue repair.</li></ul>",
      "<h3>Professional Management</h3>",
      "<p>If a bedsore progresses beyond a superficial redness, professional wound care is necessary. DressingWala's experienced nurses can apply specialized dressings, such as hydrocolloids or alginates, that protect the wound and promote healing. We also provide vital education to family members on daily care and repositioning techniques.</p>"
    ],
    author: "Sr. Rakesh K.",
    reviewer: null,
    reviewerCredentials: null,
    datePublished: "2023-09-15",
    dateModified: "2023-09-15",
    category: "Elderly Care",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
  },
  {
    id: 4,
    slug: "when-to-seek-immediate-medical-attention-for-a-wound",
    title: "When to Seek Immediate Medical Attention for a Wound",
    excerpt: "Not all wounds can be treated at home. Learn the critical warning signs of infection and when you need to rush to the emergency room.",
    content: [
      "<p>While minor scrapes and cuts can easily be treated with a basic first-aid kit, some wounds carry a high risk of severe complications. Knowing when to bypass home care and seek immediate medical attention can save a limb or even a life.</p>",
      "<h3>Signs You Need the Emergency Room</h3>",
      "<ul><li><b>Uncontrollable Bleeding:</b> If a wound continues to bleed heavily after 10 minutes of direct, firm pressure, or if blood is spurting.</li><li><b>Deep Wounds:</b> Any cut that is deep enough to expose fat, muscle, or bone, or is gaping open, likely requires stitches.</li><li><b>Animal Bites:</b> High risk for rabies and deep tissue infections.</li><li><b>Foreign Objects:</b> If there is glass, metal, or debris deeply embedded in the wound. Do NOT attempt to pull it out yourself.</li></ul>",
      "<h3>Signs of a Serious Infection</h3>",
      "<p>Even minor wounds can become infected. Look out for the following 'Red Flags':</p>",
      "<ul><li>Red streaks spreading from the wound towards the heart (a sign of lymphangitis).</li><li>Increased, severe pain and swelling.</li><li>Thick, green, or foul-smelling pus.</li><li>A high fever or feeling lethargic.</li></ul>",
      "<h3>The Role of Home Nursing</h3>",
      "<p>DressingWala provides excellent post-treatment care. Once an emergency room doctor has cleaned, stitched, or stabilized your wound, our nurses can visit your home for the subsequent dressing changes. However, we do not provide emergency trauma care. Always prioritize a hospital visit for acute, severe injuries.</p>"
    ],
    author: "Dr. Vivek M.",
    reviewer: "Dr. Vivek M.",
    reviewerCredentials: "MS General Surgery",
    datePublished: "2023-08-30",
    dateModified: "2023-08-30",
    category: "First Aid",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80"
  }
];
