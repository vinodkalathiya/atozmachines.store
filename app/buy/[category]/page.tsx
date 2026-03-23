import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_LISTINGS } from "@/app/lib/data";
import { CATEGORY_SEO } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `Buy ${cat.name} in India — Get Quotes from Verified Manufacturers | A TO Z Machines`,
    description: `Buy ${cat.name} from verified Indian manufacturers. Compare prices, specs & lead times. Get free quotes from ${cat.count}+ suppliers within 24 hours. No spam calls.`,
    keywords: `buy ${cat.name} India, ${cat.name} price, ${cat.name} suppliers, ${cat.name} manufacturers India, ${cat.name} online`,
    alternates: { canonical: `https://atozmachines.store/buy/${category}` },
    openGraph: {
      title: `Buy ${cat.name} in India | A TO Z Machines`,
      description: `Compare ${cat.name} prices from ${cat.count}+ verified Indian manufacturers. Free quotes in 24 hours.`,
      type: "website",
    },
  };
}

const STEPS = [
  { n: "1", title: "Describe Your Requirement", desc: "Fill in machine specs, quantity, delivery location, and budget range. Upload drawings if you have them." },
  { n: "2", title: "Receive Matched Quotes", desc: "Our system sends your requirement to relevant verified manufacturers. They respond with detailed quotes within 24 hours." },
  { n: "3", title: "Compare & Connect", desc: "Review all quotes side-by-side. Click Interested on the best quote — vendor contact is then revealed." },
];

export default async function BuyPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const seoData = CATEGORY_SEO[category];
  const listings = SEED_LISTINGS.filter((l) => l.categorySlug === category && l.isApproved);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Buy ${cat.name} in India`,
    description: `Find and buy ${cat.name} from verified Indian manufacturers. Get free quotes in 24 hours.`,
    url: `https://atozmachines.store/buy/${category}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://atozmachines.store" },
        { "@type": "ListItem", position: 2, name: "Buy", item: "https://atozmachines.store/buy" },
        { "@type": "ListItem", position: 3, name: cat.name, item: `https://atozmachines.store/buy/${category}` },
      ],
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-blue-700">Home</Link>
              <span>/</span>
              <span>Buy</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{cat.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gray-900 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-3">Buy in India · Free Quotes · No Spam</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                Buy {cat.name} from Verified Indian Manufacturers
              </h1>
              <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                Compare prices, specs, and lead times from {cat.count}+ verified {cat.name} manufacturers across India.
                Post your requirement free — receive multiple quotes within 24 hours. Your contact stays private until you&apos;re interested.
              </p>
              {seoData && (
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <p className="text-gray-300 text-sm font-semibold mb-1">Price Range</p>
                  <p className="text-white text-2xl font-bold">{seoData.priceRange}</p>
                  <Link href={`/price-guide/${category}`} className="text-orange-400 text-xs hover:underline">
                    See full price breakdown →
                  </Link>
                </div>
              )}
              <Link
                href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg text-sm"
              >
                📋 Get Free Quotes for {cat.name}
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

          {/* How it Works */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">How to Buy {cat.name} on A TO Z Machines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STEPS.map((s) => (
                <div key={s.n} className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {s.n}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Listings */}
          {listings.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">Available {cat.name} — Current Listings</h2>
                <Link href={`/category/${category}`} className="text-sm text-blue-700 hover:underline">View all →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {listings.map((l) => (
                  <Link key={l.id} href={`/machines/${l.id}`}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all block">
                    <span className="text-xs text-green-600 font-semibold">✓ Verified Manufacturer</span>
                    <h3 className="font-bold text-gray-900 text-sm mt-2 mb-1 leading-snug">{l.title}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">{l.description}</p>
                    <p className="text-xs text-gray-400 mb-1">🏭 {l.vendorName}</p>
                    <p className="text-xs text-gray-400 mb-3">📍 {l.vendorCity} {l.leadTimeDays && `· ⏱ ${l.leadTimeDays} days`}</p>
                    {l.priceMin && (
                      <p className="text-blue-800 font-bold text-sm">
                        ₹{l.priceMin.toLocaleString()} – ₹{l.priceMax?.toLocaleString()}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Buyer Guide */}
          {seoData?.buyGuide && (
            <section className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-5">What to Check Before Buying {cat.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seoData.buyGuide.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <span className="w-6 h-6 bg-blue-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-gray-700 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Use Cases */}
          {seoData?.useCases && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Industries That Use {cat.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {seoData.useCases.map((u) => (
                  <div key={u} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                    <p className="text-xs text-gray-700 font-medium">{u}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Price Summary */}
          {seoData?.priceTable && (
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">{cat.name} Price in India</h2>
                <Link href={`/price-guide/${category}`} className="text-sm text-blue-700 hover:underline">Full price guide →</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                      <th className="text-left px-4 py-3 rounded-l-lg">Machine Type / Spec</th>
                      <th className="text-right px-4 py-3 rounded-r-lg">Price Range (India)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoData.priceTable.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-700">{row.spec}</td>
                        <td className="px-4 py-3 font-semibold text-blue-800 text-right">{row.priceRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">Prices are indicative. Get exact quotes from manufacturers for your specific requirement.</p>
            </section>
          )}

          {/* Final CTA */}
          <section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-10 text-white text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Ready to Buy {cat.name}?</h2>
            <p className="text-orange-100 text-sm mb-6 max-w-xl mx-auto">
              Post your exact requirement free. Our system matches you with verified {cat.name} manufacturers across India.
              Receive quotes within 24 hours. No spam calls — you control who gets your contact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/post-rfq" className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-7 py-3.5 rounded-xl transition-colors shadow text-sm">
                📋 Post Your Requirement — Free
              </Link>
              <Link href={`/manufacturers/${category}`} className="border-2 border-white text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">
                Browse Manufacturers
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
