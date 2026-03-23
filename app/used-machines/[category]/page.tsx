import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_VENDORS } from "@/app/lib/data";
import { CATEGORY_SEO } from "@/app/lib/seo-data";
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

  const seoData = CATEGORY_SEO[category];
  return {
    title: `Used ${cat.name} for Sale in India — Refurbished & Second-Hand | A TO Z Machines`,
    description: `Buy used and refurbished ${cat.name} in India. Verified sellers, inspected machines, fair pricing. Price range: ${seoData?.priceRange ?? "contact for quote"}. Post your requirement free.`,
    keywords: `used ${cat.name} India, second hand ${cat.name} price, refurbished ${cat.name} sale, buy used ${cat.name.toLowerCase()} India`,
    alternates: { canonical: `https://atozmachines.store/used-machines/${category}` },
  };
}

export default async function UsedMachinesPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const seoData = CATEGORY_SEO[category];
  const vendors = SEED_VENDORS.filter((v) => v.isApproved && v.categories.includes(category));
  const allVendors = vendors.length > 0 ? vendors : SEED_VENDORS.filter((v) => v.isApproved);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Used ${cat.name} for Sale in India`,
    description: `Buy used and refurbished ${cat.name} from verified sellers in India`,
    url: `https://atozmachines.store/used-machines/${category}`,
  };

  const BUYING_TIPS = [
    "Always request a machine inspection report before purchase",
    "Check the total running hours — lower is better for CNC and precision machines",
    "Verify spare parts availability for the make and model",
    "Request a demo run before finalizing the deal",
    "Confirm the age of wear parts: spindle, bearings, hydraulics",
    "Negotiate a short warranty or service agreement with the seller",
    "Compare with the new machine price to calculate ROI",
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
              <span>Used Machines</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{cat.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1a2e5a] to-[#2d4a8f] text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-3">Used & Refurbished · {cat.name}</p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cat.icon}</span>
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Used {cat.name} for Sale — India
                </h1>
              </div>
              <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                Find used and refurbished {cat.name} from verified sellers across India.
                Save 40–60% compared to new machines. All sellers are GST-verified on A TO Z Machines.
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">40–60%</span>
                  <span className="text-blue-200 ml-1">Cost Savings</span>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">{allVendors.length}+</span>
                  <span className="text-blue-200 ml-1">Verified Sellers</span>
                </div>
                {seoData && (
                  <div className="bg-white/10 rounded-lg px-4 py-2">
                    <span className="font-bold text-white">New: {seoData.priceRange}</span>
                    <span className="text-blue-200 ml-1">Reference Price</span>
                  </div>
                )}
              </div>
              <Link href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm">
                Post Requirement — Find Used {cat.name}
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main */}
            <div className="lg:col-span-2 space-y-8">

              {/* Sellers */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Verified {cat.name} Sellers</h2>
                <p className="text-gray-500 text-sm mb-4">
                  These verified manufacturers and dealers may have used or refurbished {cat.name} available.
                  Post an RFQ specifying you need a used machine — they will respond with available inventory.
                </p>
                <div className="space-y-4">
                  {allVendors.map((v) => (
                    <Link key={v.id} href={`/vendors/${v.id}`}
                      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${v.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                          {v.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-gray-900 text-sm">{v.companyName}</h3>
                            <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">✓ Verified</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-0.5 mb-2">📍 {v.city}, {v.state} · Est. {v.establishedYear}</p>
                          <p className="text-gray-600 text-xs line-clamp-2">{v.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Buying Tips */}
              <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">Buying Used {cat.name} — Essential Checklist</h2>
                <ul className="space-y-2">
                  {BUYING_TIPS.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-yellow-600 font-bold mt-0.5">{i + 1}.</span>{tip}
                    </li>
                  ))}
                </ul>
              </section>

              {/* New vs Used */}
              <section className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">New vs Used {cat.name} — Key Differences</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-700">Factor</th>
                        <th className="text-left p-3 font-semibold text-blue-700">New Machine</th>
                        <th className="text-left p-3 font-semibold text-orange-700">Used Machine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 text-gray-600">Cost</td>
                        <td className="p-3 text-blue-700 font-medium">Full price</td>
                        <td className="p-3 text-green-700 font-medium">40–60% savings</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-600">Warranty</td>
                        <td className="p-3">1–2 years standard</td>
                        <td className="p-3">Usually none (negotiable)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-600">Technology</td>
                        <td className="p-3">Latest features</td>
                        <td className="p-3">Older generation</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-600">Lead Time</td>
                        <td className="p-3">30–120 days</td>
                        <td className="p-3">Usually immediate</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-600">Depreciation</td>
                        <td className="p-3">High in year 1</td>
                        <td className="p-3">Already depreciated</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-600">Best for</td>
                        <td className="p-3">Long-term production</td>
                        <td className="p-3 text-orange-700">Budget projects, trials</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* New Machine Price Reference */}
              {seoData && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">New {cat.name} — Price Reference</h3>
                  <p className="text-2xl font-bold text-blue-800 mb-3">{seoData.priceRange}</p>
                  <p className="text-xs text-gray-500 mb-3">Used machines typically sell at 40–60% of new price</p>
                  <div className="space-y-2">
                    {seoData.priceTable.slice(0, 3).map((row) => (
                      <div key={row.spec} className="flex justify-between text-xs border-b border-gray-100 pb-1.5">
                        <span className="text-gray-600">{row.spec}</span>
                        <span className="font-semibold text-gray-900">{row.priceRange}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={`/price-guide/${category}`} className="text-xs text-blue-700 hover:underline mt-3 block">
                    Full price guide →
                  </Link>
                </div>
              )}

              {/* Post RFQ */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
                <p className="font-bold text-gray-900 text-sm mb-1">Find Used {cat.name}</p>
                <p className="text-gray-500 text-xs mb-3">Post your requirement mentioning you need a used machine. Verified sellers will respond.</p>
                <Link href="/post-rfq" className="block bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors mb-2">
                  Post RFQ — Free
                </Link>
                <Link href={`/manufacturers/${category}`} className="text-xs text-blue-700 hover:underline">
                  View new {cat.name} →
                </Link>
              </div>

              {/* Other Used Categories */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Other Used Machines</h3>
                <div className="space-y-1.5">
                  {otherCategories.map((c) => (
                    <Link key={c.slug} href={`/used-machines/${c.slug}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-700 py-1 border-b border-gray-50">
                      <span>{c.icon}</span><span>{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
