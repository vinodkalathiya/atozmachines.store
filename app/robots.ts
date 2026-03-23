import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/buyer/", "/vendor/dashboard", "/vendor/leads/"],
    },
    sitemap: "https://atozmachines.store/sitemap.xml",
    host: "https://atozmachines.store",
  };
}
