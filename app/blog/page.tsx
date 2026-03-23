import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Industrial Machinery Blog — Buyer Guides, Price Guides & Industry News | A TO Z Machines",
  description: "Expert guides on buying industrial machinery in India. CNC machine pricing, RFQ tips, supplier verification, packaging machine guides, and export sourcing resources.",
  keywords: "industrial machinery blog, CNC machine guide India, machinery buyer guide, RFQ guide, machinery pricing India",
  alternates: { canonical: "https://atozmachines.store/blog" },
  openGraph: {
    title: "Industrial Machinery Blog | A TO Z Machines",
    description: "Buyer guides, price guides, and industry insights for industrial machinery sourcing in India.",
    type: "website",
  },
};

const CATEGORIES_LIST = ["All", "Buyer Guides", "Price Guides", "Industry Guides", "Export Guides", "Platform Guides"];

const CATEGORY_COLORS: Record<string, string> = {
  "Buyer Guides": "bg-blue-100 text-blue-700",
  "Price Guides": "bg-green-100 text-green-700",
  "Industry Guides": "bg-purple-100 text-purple-700",
  "Export Guides": "bg-orange-100 text-orange-700",
  "Platform Guides": "bg-gray-100 text-gray-700",
};

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">Resources & Guides</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Industrial Machinery Blog</h1>
              <p className="text-gray-500 text-sm">
                Practical guides for buyers sourcing industrial machinery in India — from writing the perfect RFQ to verifying suppliers and comparing prices.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Featured Post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="block bg-white rounded-2xl border border-gray-200 p-8 mb-10 hover:shadow-lg hover:border-blue-300 transition-all"
          >
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? "bg-gray-100 text-gray-700"}`}>
              {featured.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-3 mb-3 leading-tight">{featured.title}</h2>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{featured.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>📅 {new Date(featured.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span>⏱ {featured.readTime} min read</span>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                  {post.category}
                </span>
                <h2 className="font-bold text-gray-900 text-sm mt-3 mb-2 leading-snug">{post.title}</h2>
                <p className="text-gray-500 text-xs line-clamp-3 mb-3 leading-relaxed">{post.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>📅 {new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                  <span>·</span>
                  <span>⏱ {post.readTime} min</span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">Ready to source industrial machinery?</h3>
              <p className="text-gray-500 text-sm mt-0.5">Post your RFQ free and receive quotes from verified manufacturers within 24 hours.</p>
            </div>
            <Link href="/post-rfq" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap text-sm">
              Post RFQ — Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
