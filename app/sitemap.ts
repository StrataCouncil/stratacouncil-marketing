import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/site-url";

/** /sitemap.xml: the pages search engines should index (/coming-soon only redirects home). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
