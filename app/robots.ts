import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/site-url";

/** /robots.txt: everything public may be crawled; the sitemap lists the pages. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
