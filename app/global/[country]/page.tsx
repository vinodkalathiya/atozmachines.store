import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/app/lib/data";
import { SEO_COUNTRIES, getCountryBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return SEO_COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const countryData = getCountryBySlug(country);
  if (!countryData) return {};
  return {
    title: `Industrial Machinery Suppliers from India for ${countryData.name} — Export Quotes | A TO Z Machines`,
    description: `Buy industrial machinery from verified Indian manufacturers for ${countryData.name}. Compare prices, get export quotes from 2,000+ manufacturers within 24 hours. Cost-effective, quality-certified.`,
    keywords: `industrial machinery suppliers India ${countryData.name}, machinery export India to ${countryData.name}, buy machines from India ${countryData.name}, Indian machinery manufacturers ${countryData.name}`,
    alternates: { canonical: `https://atozmachines.store/global/${country}` },
    openGraph: {
      title: `Indian Machinery Suppliers for ${countryData.name} | A TO Z Machines`,
      description: `Source industrial machinery from 2,000+ verified Indian manufacturers. Export quotes for ${countryData.name} buyers.`,
      type: "website",
    },
  };
}

const WHY_INDIA = [
  { icon: "💰", title: "Cost Advantage", desc: "Indian machinery costs 40–60% less than European/US equivalents for comparable quality" },
  { icon: "✅", title: "Quality Certified", desc: "ISO 9001, CE marking, and BIS certification available from most exporters" },
  { icon: "⚡", title: "Fast Delivery", desc: "Sea freight from JNPT to most global ports in 7–21 days" },
  { icon: "🔧", title: "Customization", desc: "Indian manufacturers excel at custom machinery built to your exact specifications" },
  { icon: "📞", title: "English Support", desc: "Fluent English-speaking sales and technical teams at all major manufacturers" },
  { icon: "🤝", title: "CEPA/FTA Benefits", desc: "Multiple India FTAs reduce import duty for buyers in UAE, Australia, and Southeast Asia" },
];

export default async function GlobalCountryPage({ params }: Props) {
  const { country } = await params;
  const countryData = getCountryBySlug(country);
  if (!countryData) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Industrial Machinery Suppliers from India for ${countryData.name}`,
    description: `Source industrial machinery from verified Indian manufacturers for buyers in ${countryData.name}`,
    url: `https://atozmachines.store/global/${country}`,
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
              <span>Global</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{countryData.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{countryData.flag}</span>
                <div>
                  <p className="text-blue-300 text-xs font-bold tracking-widest uppercase">India → {countryData.name}</p>
                  <h1 className="text-2xl sm:text-3xl font-bold leading-tight mt-1">
                    Industrial Machinery from India for {countryData.name} Buyers
                  </h1>
                </div>
              </div>
              <p className="text-blue-200 text-sm sm:text-base mb-6 leading-relaxed">
                {countryData.whyIndia}
              </p>
              <Link
                href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm"
              >
                Get Export Quotes from Indian Manufacturers
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

          {/* Why India */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Why {countryData.name} Buyers Source Machinery from India</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_INDIA.map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5">
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Machine Categories */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Browse Machine Categories — India Export to {countryData.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/global/${country}/${cat.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all text-center group"
                >
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-blue-700 leading-tight">{cat.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{cat.count}+ vendors</p>
                </Link>
              ))}
            </div>
          </section>

          {/* How It Works for International */}
          <section className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How {countryData.name} Buyers Source from India</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {[
                { n: "1", title: "Post Your RFQ", desc: "Describe your requirement with specs and quantity. Free — no account needed." },
                { n: "2", title: "Get Export Quotes", desc: "Verified Indian manufacturers with export experience respond within 24 hours." },
                { n: "3", title: "Compare & Select", desc: "Review quotes including FOB/CIF pricing, certifications, and lead times." },
                { n: "4", title: "Order & Ship", desc: "Place order directly with manufacturer. They handle export documentation." },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">{s.n}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Other Countries */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Other Export Markets</h2>
            <div className="flex flex-wrap gap-2">
              {SEO_COUNTRIES.filter((c) => c.slug !== country).map((c) => (
                <Link key={c.slug} href={`/global/${c.slug}`}
                  className="text-sm text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">
                  {c.flag} {c.name}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white text-center">
            <h2 className="text-xl font-bold mb-3">Ready to Source Industrial Machinery from India?</h2>
            <p className="text-orange-100 text-sm mb-5 max-w-xl mx-auto">
              Post your requirement free. 2,000+ verified Indian manufacturers with export experience will respond with detailed quotes including export pricing within 24 hours.
            </p>
            <Link href="/post-rfq" className="inline-block bg-white text-orange-600 hover:bg-orange-50 font-bold px-7 py-3.5 rounded-xl transition-colors shadow text-sm">
              📋 Post Your Requirement — Free
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
