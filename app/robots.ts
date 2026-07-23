import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.tirath-wood-works.com/sitemap.xml",
    host: "https://www.tirath-wood-works.com",
  };
}
