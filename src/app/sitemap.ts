import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      // English and Arabic share one page (the language is switched in the browser).
      alternates: { languages: { en: `${SITE_URL}/`, ar: `${SITE_URL}/` } },
    },
    { url: `${SITE_URL}/llms.txt`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];
}
