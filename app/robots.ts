import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://git-sheet.hi-shanto.me/sitemap.xml",
    host: "https://git-sheet.hi-shanto.me",
  };
}
