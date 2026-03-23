import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/app/lib/data";
import { SEO_CITIES, SEO_COUNTRIES, BLOG_POSTS } from "@/app/lib/seo-data";

const BASE = "https://atozmachines.store";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

function url(
  path: string,
  priority: number,
  changeFrequency: ChangeFreq = "weekly",
  lastModified?: Date
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${path}`,
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static Pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    url("/", 1.0, "daily", now),
    url("/categories", 0.9, "weekly"),
    url("/vendors", 0.8, "weekly"),
    url("/pricing", 0.7, "monthly"),
    url("/post-rfq", 0.9, "weekly"),
    url("/register", 0.6, "monthly"),
    url("/login", 0.5, "monthly"),
    url("/vendor/register", 0.7, "monthly"),
    url("/blog", 0.8, "weekly"),
  ];

  // ── Category Pages ────────────────────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) =>
    url(`/category/${cat.slug}`, 0.9, "weekly")
  );

  // ── Manufacturer Pages (/manufacturers/[category]) ────────────────────────
  const manufacturerPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) =>
    url(`/manufacturers/${cat.slug}`, 0.8, "weekly")
  );

  // ── Buy Intent Pages (/buy/[category]) ───────────────────────────────────
  const buyPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) =>
    url(`/buy/${cat.slug}`, 0.8, "weekly")
  );

  // ── Price Guide Pages (/price-guide/[category]) ───────────────────────────
  const priceGuidePages: MetadataRoute.Sitemap = CATEGORIES.map((cat) =>
    url(`/price-guide/${cat.slug}`, 0.8, "weekly")
  );

  // ── Supplier City Hub Pages (/suppliers/[city]) ───────────────────────────
  const supplierCityPages: MetadataRoute.Sitemap = SEO_CITIES.map((city) =>
    url(`/suppliers/${city.slug}`, 0.8, "weekly")
  );

  // ── Supplier City+Category Pages (/suppliers/[city]/[category]) ──────────
  const supplierCityCategoryPages: MetadataRoute.Sitemap = SEO_CITIES.flatMap(
    (city) =>
      CATEGORIES.map((cat) =>
        url(`/suppliers/${city.slug}/${cat.slug}`, 0.8, "weekly")
      )
  );

  // ── Global Country Hub Pages (/global/[country]) ─────────────────────────
  const globalCountryPages: MetadataRoute.Sitemap = SEO_COUNTRIES.map(
    (country) => url(`/global/${country.slug}`, 0.7, "weekly")
  );

  // ── Global Country+Category Pages (/global/[country]/[category]) ─────────
  const globalCountryCategoryPages: MetadataRoute.Sitemap =
    SEO_COUNTRIES.flatMap((country) =>
      CATEGORIES.map((cat) =>
        url(`/global/${country.slug}/${cat.slug}`, 0.7, "weekly")
      )
    );

  // ── Blog Posts (/blog/[slug]) ─────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) =>
    url(`/blog/${post.slug}`, 0.7, "monthly", new Date(post.publishedAt))
  );

  return [
    ...staticPages,
    ...categoryPages,
    ...manufacturerPages,
    ...buyPages,
    ...priceGuidePages,
    ...supplierCityPages,
    ...supplierCityCategoryPages,
    ...globalCountryPages,
    ...globalCountryCategoryPages,
    ...blogPages,
  ];
}
