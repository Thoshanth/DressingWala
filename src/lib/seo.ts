import { CONTACT } from "./contact";
import { SITE } from "./seo-pages";

export function buildHead({
  title,
  description,
  path,
  image = "/hero-nurse.jpg",
  jsonLd = [],
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: any[];
}) {
  const url = `${SITE}${path}`;
  const imageUrl = `${SITE}${image}`;

  const meta = [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:image", content: imageUrl },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];

  const links = [
    { rel: "canonical", href: url },
  ];

  const scripts = jsonLd.map((schema) => ({
    type: "application/ld+json",
    children: JSON.stringify(schema),
  }));

  return {
    title,
    meta,
    links,
    scripts,
  };
}

export function businessSchema(areas: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "DressingWala",
    url: SITE,
    logo: `${SITE}/Logo_Backgroun_Removed.png`,
    telephone: CONTACT.phone,
    areaServed: [
      "Hyderabad",
      ...areas,
    ],
    openingHours: "00:00-23:59",
    priceRange: "₹599 - ₹1199",
    sameAs: [], // TODO: Add Google Business Profile / social URLs here
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE}${path}`,
    provider: {
      "@type": "MedicalBusiness",
      name: "DressingWala",
      url: SITE,
    },
    areaServed: "Hyderabad",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function articleSchema({
  headline,
  path,
  datePublished,
  dateModified,
  authorName,
  reviewerName,
}: {
  headline: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  reviewerName: string | null;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    url: `${SITE}${path}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "DressingWala",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/Logo_Backgroun_Removed.png`,
      },
    },
  };
  
  if (reviewerName) {
    schema.reviewedBy = {
      "@type": "Person",
      name: reviewerName,
    };
  }

  return schema;
}
