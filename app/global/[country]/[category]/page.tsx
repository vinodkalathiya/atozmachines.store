import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_VENDORS, SEED_LISTINGS } from "@/app/lib/data";
import { SEO_COUNTRIES, CATEGORY_SEO, getCountryBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ country: string; category: string }>;
}

export async function generateStaticParams() {
  return SEO_COUNTRIES.flatMap((country) =>
    CATEGORIES.map((cat) => ({ country: country.slug, category: cat.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, category } = await params;
  const countryData = getCountryBySlug(country);
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!countryData || !cat) return {};

  return {
    title: `${cat.name} Exporters India to ${countryData.name} — Export Quotes | A TO Z Machines`,
    description: `Source ${cat.name} from verified Indian manufacturers for ${countryData.name}. Get export quotes with FOB/CIF pricing, CE certification, and 24-hour response from ${cat.count}+ verified exporters.`,
    keywords: `${cat.name} exporters India ${countryData.name}, ${cat.name} suppliers India for ${countryData.name}, buy ${cat.name} from India ${countryData.name}, ${cat.name} India export`,
    alternates: { canonical: `https://atozmachines.store/global/${country}/${category}` },
    openGraph: {
      title: `${cat.name} from India for ${countryData.name} | A TO Z Machines`,
      description: `${cat.name} export quotes from verified Indian manufacturers for ${countryData.name} buyers.`,
      type: "website",
    },
  };
}

export default async function GlobalCountryCategoryPage({ params }: Props) {
  const { country, category } = await params;
  const countryData = getCountryBySlug(country);
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!countryData || !cat) notFound();

  const seoData = CATEGORY_SEO[category];
  const vendors = SEED_VENDORS.filter(
    (v) => v.isApproved && v.categories.includes(category)
  );
  const allVendors = vendors.length > 0 ? vendors : SEED_VENDORS.filter((v) => v.isApproved);
  const listings = SEED_LISTINGS.filter((l) => l.categorySlug === category && l.isApproved);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat.name} Exporters from India for ${countryData.name}`,
    description: `Verified Indian ${cat.name} manufacturers with export capability for ${countryData.name} buyers`,
    url: `https://atozmachines.store/global/${country}/${category}`,
    numberOfItems: allVendors.length,
    itemListElement: allVendors.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: v.companyName,
        address: { "@type": "PostalAddress", addressLocality: v.city, addressRegion: v.state, addressCountry: "IN" },
      },
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://atozmachines.store" },
        { "@type": "ListItem", position: 2, name: "Global", item: "https://atozmachines.store/global" },
        { "@type": "ListItem", position: 3, name: countryData.name, item: `https://atozmachines.store/global/${country}` },
        { "@type": "ListItem", position: 4, name: cat.name, item: `https://atozmachines.store/global/${country}/${category}` },
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
            <nav className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <Link href="/" className="hover:text-blue-700">Home</Link>
              <span>/</span>
              <Link href={`/global/${country}`} className="hover:text-blue-700">India → {countryData.name}</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{cat.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{cat.icon}</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇮🇳</span>
                  <span className="text-blue-300">→</span>
                  <span className="text-2xl">{countryData.flag}</span>
                </div>
              </div>
              <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-2">India Export · {countryData.name}</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                {cat.name} Suppliers from India for {countryData.name} Buyers
              </h1>
              <p className="text-blue-200 text-sm sm:text-base mb-4 leading-relaxed">
                Source {cat.name} from {cat.count}+ verified Indian manufacturers with export experience.
                {seoData ? ` Price range: ${seoData.priceRange}.` : ""}
                {" "}Get export quotes with FOB/CIF pricing, certifications, and lead times within 24 hours.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  <span className="font-bold text-white">{allVendors.length}+</span>
                  <span className="text-blue-200 ml-1">Export-Ready Vendors</span>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  <span className="font-bold text-white">24hr</span>
                  <span className="text-blue-200 ml-1">Quote Response</span>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2 text-sm">
                  <span className="font-bold text-white">GST Free</span>
                  <span className="text-blue-200 ml-1">Export Invoice</span>
                </div>
              </div>
              <Link
                href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm"
              >
                Get Export Quotes for {cat.name}
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main */}
            <div className="lg:col-span-2 space-y-8">

              {/* Why India */}
              <section className="bg-blue-50 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 mb-3">Why Buy {cat.name} from India?</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{countryData.whyIndia}</p>
                {seoData && (
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">
                    {seoData.description}
                  </p>
                )}
              </section>

              {/* Vendor List */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Verified Indian {cat.name} Manufacturers</h2>
                <div className="space-y-4">
                  {allVendors.map((v) => (
                    <Link
                      key={v.id}
                      href={`/vendors/${v.id}`}
                      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${v.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                          {v.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-gray-900 text-sm">{v.companyName}</h3>
                            <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">✓ GST Verified</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-0.5 mb-2">📍 {v.city}, {v.state} · Est. {v.establishedYear}</p>
                          <p className="text-gray-600 text-xs line-clamp-2">{v.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {v.categories.map((c) => {
                              const catObj = CATEGORIES.find((x) => x.slug === c);
                              return catObj ? (
                                <span key={c} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{catObj.name}</span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Listings */}
              {listings.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{cat.name} — Available for Export</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {listings.map((l) => (
                      <Link key={l.id} href={`/machines/${l.id}`}
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all block">
                        <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{l.categoryName}</span>
                        <h3 className="font-bold text-gray-900 text-sm mt-2 mb-1">{l.title}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{l.description}</p>
                        <p className="text-xs text-gray-400">🇮🇳 {l.vendorCity}</p>
                        {l.priceMin && (
                          <p className="text-blue-800 font-bold text-sm mt-1">
                            ₹{l.priceMin.toLocaleString()} – ₹{l.priceMax?.toLocaleString()}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Export Process */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">How to Import {cat.name} from India to {countryData.name}</h2>
                <div className="space-y-3">
                  {[
                    { n: "1", t: "Post RFQ", d: "Submit your specification, quantity, and delivery port. Include drawings if custom." },
                    { n: "2", t: "Receive Quotes", d: "Indian manufacturers respond with FOB India pricing, lead time, and certifications." },
                    { n: "3", t: "Select & Negotiate", d: "Compare quotes, request samples if needed, negotiate payment terms (LC/TT)." },
                    { n: "4", t: "Order & Shipping", d: "Manufacturer handles export documentation. Goods shipped via sea/air freight." },
                    { n: "5", t: "Receive & Commission", d: "Clear customs in {country}. Manufacturer provides commissioning support remotely." },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-3">
                      <span className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{s.n}</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{s.t}</p>
                        <p className="text-gray-600 text-xs">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Price */}
              {seoData && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{cat.name} Price (India)</h3>
                  <p className="text-2xl font-bold text-blue-800 mb-3">{seoData.priceRange}</p>
                  <p className="text-xs text-gray-500 mb-3">Export price = India price + freight + insurance + {countryData.name} import duty</p>
                  <div className="space-y-1.5">
                    {seoData.priceTable.slice(0, 4).map((row) => (
                      <div key={row.spec} className="flex justify-between text-xs border-b border-gray-100 pb-1.5">
                        <span className="text-gray-600">{row.spec}</span>
                        <span className="font-semibold text-gray-900">{row.priceRange}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Categories */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Other Machines — India to {countryData.name}</h3>
                <div className="space-y-1.5">
                  {CATEGORIES.filter((c) => c.slug !== category).slice(0, 5).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/global/${country}/${c.slug}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-700 py-1 border-b border-gray-50"
                    >
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                    </Link>
                  ))}
                </div>
                <Link href={`/global/${country}`} className="text-xs text-blue-700 hover:underline mt-2 block">
                  All categories for {countryData.name} →
                </Link>
              </div>

              {/* Other Countries */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">{cat.name} Export to Other Countries</h3>
                <div className="space-y-1.5">
                  {SEO_COUNTRIES.filter((c) => c.slug !== country).slice(0, 5).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/global/${c.slug}/${category}`}
                      className="flex items-center justify-between text-xs text-gray-600 hover:text-blue-700 py-1 border-b border-gray-50"
                    >
                      <span>{c.flag} {c.name}</span>
                      <span className="text-blue-600">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
                <p className="font-bold text-gray-900 text-sm mb-1">Get {cat.name} Export Quotes</p>
                <p className="text-gray-500 text-xs mb-3">Free RFQ. Quotes with FOB/CIF pricing in 24 hours from verified Indian manufacturers.</p>
                <Link href="/post-rfq" className="block bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                  Post RFQ — Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
