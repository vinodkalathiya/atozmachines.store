import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/app/lib/data";
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
    title: `${cat.name} Price in India 2025 — Buyer's Price Guide | A TO Z Machines`,
    description: `${cat.name} price range in India: ${CATEGORY_SEO[category]?.priceRange ?? "varies"}. Complete price guide by machine type and specification. Get exact quotes from verified manufacturers.`,
    keywords: `${cat.name} price India, ${cat.name} cost India, ${cat.name} price list, ${cat.name} price 2025, how much does ${cat.name} cost India`,
    alternates: { canonical: `https://atozmachines.store/price-guide/${category}` },
    openGraph: {
      title: `${cat.name} Price Guide India 2025 | A TO Z Machines`,
      description: `${cat.name} prices from ₹${CATEGORY_SEO[category]?.priceRange ?? "varies"}. Get exact quotes from ${cat.count}+ verified manufacturers.`,
      type: "website",
    },
  };
}

const PRICE_FACTORS: Record<string, string[]> = {
  "cnc-machines": ["Number of axes (3-axis vs 4-axis vs 5-axis)", "Table size and travel range", "Spindle speed and power", "Controller brand (Fanuc, Siemens vs GSK)", "Tool magazine capacity"],
  "packaging-machines": ["Automation level (manual vs semi vs fully automatic)", "Output speed (packs per hour)", "Servo drive vs non-servo", "GMP/pharma grade compliance", "Material compatibility"],
  "default": ["Machine size and capacity", "Automation level", "Brand and origin of key components", "Compliance certification required", "After-sales support package included"],
};

export default async function PriceGuidePage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const seoData = CATEGORY_SEO[category];
  if (!seoData) notFound();

  const factors = PRICE_FACTORS[category] ?? PRICE_FACTORS["default"];
  const year = 2025;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the price of ${cat.name} in India?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${cat.name} price in India ranges from ${seoData.priceRange}. The exact price depends on specifications, capacity, automation level, and the manufacturer.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I get the best price for ${cat.name} in India?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Post an RFQ (Request for Quotation) on A TO Z Machines with your exact specifications. You will receive quotes from multiple verified manufacturers within 24 hours, allowing you to compare prices and choose the best value.`,
        },
      },
    ],
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
              <span>Price Guide</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{cat.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-white py-10 sm:py-14 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">Price Guide {year}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {cat.name} Price in India {year}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mb-4">
              Indicative price ranges based on machine type, specification, and manufacturer. Actual prices depend on your specific requirement — post an RFQ for exact quotes.
            </p>
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-2xl px-6 py-4 mb-6">
              <p className="text-gray-500 text-sm">Price Range (India)</p>
              <p className="text-3xl font-bold text-blue-800">{seoData.priceRange}</p>
            </div>
            <div className="flex justify-center">
              <Link href="/post-rfq" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl transition-colors text-sm">
                Get Exact Quotes — Free
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

          {/* Price Table */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-900 px-6 py-4">
              <h2 className="text-white font-bold text-base">{cat.name} Price List by Type — India {year}</h2>
              <p className="text-gray-400 text-xs mt-0.5">Prices are indicative; get exact quotes for your requirement</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Machine Type / Specification</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price Range (India)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {seoData.priceTable.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700 text-sm">{row.spec}</td>
                    <td className="px-6 py-4 font-bold text-blue-800 text-sm text-right">{row.priceRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Price Factors */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Factors That Affect {cat.name} Price</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {factors.map((f, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-gray-700 text-sm">{f}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">{cat.name} Price — Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">What is the price of {cat.name} in India?</h3>
                <p className="text-gray-600 text-sm">{cat.name} price in India ranges from {seoData.priceRange}. The exact price depends on specifications, capacity, automation level, and the manufacturer. Post an RFQ to get exact quotes from multiple verified manufacturers.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Can I get a lower price by importing {cat.name}?</h3>
                <p className="text-gray-600 text-sm">For most standard specifications, Indian-manufactured {cat.name} offers better value than imported machines after accounting for import duty (7.5–15%), freight, and insurance. Imported machines may be preferable for specialized or ultra-high-precision requirements.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">How do I get the best price for {cat.name}?</h3>
                <p className="text-gray-600 text-sm">Post an RFQ with your exact specifications on A TO Z Machines. You&apos;ll receive quotes from multiple verified manufacturers, enabling price comparison. Buying directly from manufacturers (not dealers or traders) typically saves 15–25%.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Does the price include GST?</h3>
                <p className="text-gray-600 text-sm">Most quoted prices in India are exclusive of GST (18% for most industrial machinery). Always confirm whether the quoted price is inclusive or exclusive of GST and transportation charges.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-blue-900 rounded-2xl p-8 text-white text-center">
            <h2 className="text-xl font-bold mb-3">Get Exact {cat.name} Price Quotes</h2>
            <p className="text-blue-200 text-sm mb-5 max-w-xl mx-auto">
              Price guides give ranges. Only verified manufacturers can give you an accurate quote for your specific requirement.
              Post your RFQ free — receive quotes within 24 hours.
            </p>
            <Link href="/post-rfq" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow text-sm">
              📋 Post RFQ for Exact Pricing
            </Link>
          </section>

          {/* Related Links */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Related Pages</h2>
            <div className="flex flex-wrap gap-2">
              <Link href={`/manufacturers/${category}`} className="text-sm text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">{cat.name} Manufacturers</Link>
              <Link href={`/buy/${category}`} className="text-sm text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">Buy {cat.name}</Link>
              <Link href={`/category/${category}`} className="text-sm text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">Browse {cat.name} Listings</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
