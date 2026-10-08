import { servicePages } from "./service-pages";
import { blogPosts } from "./blogs";

export const SITE = "https://dressingwala.com";

export type SitePage = {
  path: string;
  lastmod: string;
  image?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

export const pages: SitePage[] = [
  {
    path: "/",
    lastmod: new Date().toISOString().split("T")[0],
    image: "/hero-nurse.jpg",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    path: "/blogs",
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/about",
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "monthly",
    priority: 0.7,
  },
  ...servicePages.map((sp) => ({
    path: sp.path,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "monthly" as const,
    priority: 0.9,
  })),
  ...blogPosts.map((bp) => ({
    path: `/blog/${bp.slug}`,
    lastmod: bp.dateModified,
    image: bp.image,
    changefreq: "monthly" as const,
    priority: 0.6,
  })),
];

export function buildSitemap(): string {
  const urls = pages
    .map((page) => {
      let xml = `  <url>\n    <loc>${SITE}${page.path}</loc>\n    <lastmod>${page.lastmod}</lastmod>\n`;
      if (page.changefreq) {
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      }
      if (page.priority) {
        xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
      }
      if (page.image) {
        xml += `    <image:image>\n      <image:loc>${SITE}${page.image}</image:loc>\n    </image:image>\n`;
      }
      xml += `  </url>`;
      return xml;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
}
