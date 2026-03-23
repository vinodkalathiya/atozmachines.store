import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_VENDORS } from "@/app/lib/data";
import { CATEGORY_SEO, SEO_CITIES } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};

  return {
    title: `Get Quotes for ${cat.name} — Post RFQ Free | A TO Z Machines`,
    description: `Post your ${cat.name} requirement and receive quotes from ${cat.count}+ verified Indian manufacturers within 24 hours. Free RFQ, no spam, structured quotes.`,
    keywords: `${cat.name} RFQ India, get quotes ${cat.name}, buy ${cat.name.toLowerCase()} India quotes, ${cat.name.toLowerCase()} manufacturers quotes`,
    alternates: { canonical: `https://atozmachines.store/post-rfq/${category}` },
  };
}

export default async function PostRFQCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const seoData = CATEGORY_SEO[category];
  const vendors = SEED_VENDORS.filter((v) => v.isApproved && v.categories.includes(category));
  const allVendors = vendors.length > 0 ? vendors : SEED_VENDORS.filter((v) => v.isApproved);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Get Quotes for ${cat.name} — Post RFQ`,
    description: `Post your ${cat.name} requirement to receive quotes from verified Indian manufacturers within 24 hours.`,
    url: `https://atozmachines.store/post-rfq/${category}`,
  };

  const RFQ_STEPS = [
    { step: "1", title: "Describe your requirement", desc: `Specify the ${cat.name} type, capacity, specifications, and quantity you need.` },
    { step: "2", title: "System matches vendors", desc: `Our system instantly routes your RFQ to verified ${cat.name} manufacturers relevant to your specification.` },
    { step: "3", title: "Receive structured quotes", desc: "Get multiple quotes with pricing, lead times, and vendor details — all within 24 hours." },
    { step: "4", title: "Compare and connect", desc: "Compare quotes side by side. Connect directly with the vendor you choose." },
  ];

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
              <Link href="/post-rfq" className="hover:text-blue-700">Post RFQ</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{cat.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-14 sm:py-18">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-5xl block mb-4">{cat.icon}</span>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">
              Get Quotes for {cat.name} — Free
            </h1>
            <p className="text-orange-100 text-sm mb-6 max-w-xl mx-auto leading-relaxed">
              Post your {cat.name} requirement once. Receive structured quotes from {allVendors.length}+ verified
              Indian manufacturers within 24 hours. No spam, no cold calls — just real quotes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
              <div className="bg-white/15 rounded-lg px-4 py-2">
                <span className="font-bold">{allVendors.length}+</span>
                <span className="text-orange-200 ml-1">Verified Vendors</span>
              </div>
              <div className="bg-white/15 rounded-lg px-4 py-2">
                <span className="font-bold">24hr</span>
                <span className="text-orange-200 ml-1">Quote Response</span>
              </div>
              <div className="bg-white/15 rounded-lg px-4 py-2">
                <span className="font-bold">Free</span>
                <span className="text-orange-200 ml-1">No Cost to Buyers</span>
              </div>
            </div>
            <Link href="/post-rfq"
              className="inline-block bg-white text-orange-700 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg hover:bg-orange-50 text-sm">
              Post {cat.name} RFQ Now →
            </Link>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

          {/* How It Works */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {RFQ_STEPS.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What to Include */}
          {seoData && (
            <section className="bg-blue-50 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">What to Include in Your {cat.name} RFQ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seoData.buyGuide.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white rounded-lg p-3 border border-blue-100">
                    <span className="text-blue-600 font-bold mt-0.5">→</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-4">
                The more detail you provide, the more accurate and comparable the quotes you receive will be.
              </p>
            </section>
          )}

          {/* Price Reference */}
          {seoData && (
            <section className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{cat.name} Price Reference</h2>
              <p className="text-gray-500 text-sm mb-4">
                Use this as a guide when reviewing quotes. Actual prices depend on specifications and vendor.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-semibold text-gray-700">Specification</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Typical Price Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {seoData.priceTable.map((row) => (
                      <tr key={row.spec}>
                        <td className="p-3 text-gray-600">{row.spec}</td>
                        <td className="p-3 font-semibold text-blue-800">{row.priceRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href={`/price-guide/${category}`} className="text-xs text-blue-700 hover:underline mt-3 block">
                Full price guide with factors →
              </Link>
            </section>
          )}

          {/* Vendors */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Who Will Respond to Your RFQ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allVendors.slice(0, 4).map((v) => (
                <div key={v.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
                  <div className={`w-10 h-10 ${v.color} rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {v.initial}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{v.companyName}</p>
                    <p className="text-gray-500 text-xs">📍 {v.city}, {v.state}</p>
                    <span className="text-xs text-green-600 font-semibold">✓ GST Verified</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-3 text-center">
              + {Math.max(0, allVendors.length - 4)} more verified vendors ready to respond to your {cat.name} RFQ
            </p>
          </section>

          {/* City Links */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Find {cat.name} by City</h2>
            <div className="flex flex-wrap gap-2">
              {SEO_CITIES.map((city) => (
                <Link key={city.slug} href={`/suppliers/${city.slug}/${category}`}
                  className="text-xs text-blue-700 bg-blue-50 hover:underline px-3 py-1.5 rounded-lg">
                  {city.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to get quotes?</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Post your {cat.name} requirement. It takes 2 minutes and is completely free for buyers.
            </p>
            <Link href="/post-rfq"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors shadow-md">
              Post {cat.name} RFQ — Free
            </Link>
            <p className="text-gray-400 text-xs mt-3">No registration required to submit</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
