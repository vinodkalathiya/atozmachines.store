import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | A TO Z Machines Blog`,
    description: post.description,
    keywords: `${post.category}, industrial machinery India, ${post.title.toLowerCase()}`,
    alternates: { canonical: `https://atozmachines.store/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "Buyer Guides": "bg-blue-100 text-blue-700",
  "Price Guides": "bg-green-100 text-green-700",
  "Industry Guides": "bg-purple-100 text-purple-700",
  "Export Guides": "bg-orange-100 text-orange-700",
  "Platform Guides": "bg-gray-100 text-gray-700",
};

// Simple markdown-lite renderer for blog content
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-base font-bold text-gray-900 mt-5 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i} className="font-bold text-gray-900 my-2">{line.slice(2, -2)}</p>);
    } else if (line.startsWith("- ")) {
      // collect consecutive bullet lines
      const bullets: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        bullets.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 my-3 text-gray-700 text-sm">
          {bullets.map((b, j) => <li key={j}>{b}</li>)}
        </ul>
      );
      continue;
    } else if (line.startsWith("| ")) {
      // collect table lines
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [header, , ...rows] = tableLines;
      const headers = header.split("|").filter(Boolean).map((h) => h.trim());
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>{headers.map((h, j) => <th key={j} className="text-left px-4 py-2 font-semibold text-gray-700 text-xs">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, ri) => {
                const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                return <tr key={ri}>{cells.map((c, ci) => <td key={ci} className="px-4 py-2 text-gray-600">{c}</td>)}</tr>;
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.trim() === "") {
      // skip empty lines (they create spacing via parent flex/space)
    } else {
      // Regular paragraph — handle inline **bold**
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={i} className="text-gray-700 text-sm leading-relaxed my-2">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
        </p>
      );
    }
    i++;
  }

  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 3);
  const others = related.length < 3
    ? [...related, ...BLOG_POSTS.filter((p) => p.slug !== slug && !related.includes(p)).slice(0, 3 - related.length)]
    : related;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "A TO Z Machines" },
    publisher: { "@type": "Organization", name: "A TO Z Machines", url: "https://atozmachines.store" },
    url: `https://atozmachines.store/blog/${slug}`,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <Link href="/" className="hover:text-blue-700">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-700">Blog</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Article */}
            <article className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                  {post.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-3 leading-tight">{post.title}</h1>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{post.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 pb-4 border-b border-gray-200">
                  <span>📅 {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  <span>·</span>
                  <span>⏱ {post.readTime} min read</span>
                  <span>·</span>
                  <span>A TO Z Machines</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose-sm max-w-none">
                {renderContent(post.content)}
              </div>

              {/* Article CTA */}
              <div className="mt-10 bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Ready to Source Industrial Machinery?</h3>
                <p className="text-gray-500 text-sm mb-4">Post your requirement free on A TO Z Machines. Get quotes from verified manufacturers within 24 hours.</p>
                <Link href="/post-rfq" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                  📋 Post RFQ — Free
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Related Posts */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {others.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 leading-snug mb-1">{p.title}</p>
                      <p className="text-xs text-gray-400">{p.readTime} min · {p.category}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Quick Links</h3>
                <div className="space-y-2">
                  {[
                    { href: "/post-rfq", label: "📋 Post an RFQ" },
                    { href: "/categories", label: "⚙️ Browse Categories" },
                    { href: "/vendors", label: "🏭 Find Vendors" },
                    { href: "/pricing", label: "💰 Pricing Plans" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-blue-700 hover:underline">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter-style CTA */}
              <div className="bg-gray-900 text-white rounded-xl p-5 text-center">
                <p className="font-bold text-sm mb-1">Get Verified Machine Quotes</p>
                <p className="text-gray-400 text-xs mb-3">Free RFQ. 24-hour response. No spam.</p>
                <Link href="/post-rfq" className="block bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                  Post RFQ — Free
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
