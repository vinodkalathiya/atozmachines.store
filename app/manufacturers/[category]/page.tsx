import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_VENDORS, SEED_LISTINGS } from "@/app/lib/data";
import { CATEGORY_SEO, SEO_CITIES } from "@/app/lib/seo-data";
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
  const name = cat.name;
  return {
    title: `${name} Manufacturers in India — Verified Suppliers | A TO Z Machines`,
    description: `Find verified ${name} manufacturers & suppliers across India. Get free quotes from ${cat.count}+ verified vendors within 24 hours. Compare prices, specs, and lead times.`,
    keywords: `${name} manufacturers India, ${name} suppliers India, buy ${name} India, ${name} price India, ${name} manufacturers list`,
    alternates: { canonical: `https://atozmachines.store/manufacturers/${category}` },
    openGraph: {
      title: `${name} Manufacturers in India | A TO Z Machines`,
      description: `${cat.count}+ verified ${name} manufacturers. Get quotes in 24 hours.`,
      type: "website",
    },
  };
}

export default async function ManufacturersPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const seoData = CATEGORY_SEO[category];
  const vendors = SEED_VENDORS.filter(
    (v) => v.isApproved && v.categories.includes(category)
  );
  const allVendors = vendors.length > 0 ? vendors : SEED_VENDORS.filter((v) => v.isApproved);
  const listings = SEED_LISTINGS.filter((l) => l.categorySlug === category && l.isApproved);
  const topCities = seoData?.topCities ?? SEO_CITIES.slice(0, 5).map((c) => c.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat.name} Manufacturers in India`,
    description: `Verified ${cat.name} manufacturers and suppliers across India`,
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
              <span>Manufacturers</span>
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
                <span className="text-5xl">{cat.icon}</span>
                <div>
                  <p className="text-blue-300 text-xs font-bold tracking-widest uppercase">Manufacturers Directory</p>
                  <h1 className="text-2xl sm:text-3xl font-bold leading-tight mt-1">
                    {cat.name} Manufacturers in India
                  </h1>
                </div>
              </div>
              <p className="text-blue-200 text-sm sm:text-base leading-relaxed mb-6">
                {seoData?.description ?? `Find verified ${cat.name} manufacturers and suppliers across India. Browse listings, compare vendors, and get free quotes within 24 hours.`}
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">{cat.count}+</span>
                  <span className="text-blue-200 ml-1">Verified Vendors</span>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">{listings.length || "50+"}+</span>
                  <span className="text-blue-200 ml-1">Active Listings</span>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">24hr</span>
                  <span className="text-blue-200 ml-1">Quote Response</span>
                </div>
              </div>
              <Link
                href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm"
              >
                Get Free Quotes from {cat.name} Manufacturers
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Vendor Cards */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Verified {cat.name} Manufacturers</h2>
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

              {/* Machine Listings */}
              {listings.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{cat.name} — Active Listings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {listings.map((l) => (
                      <Link key={l.id} href={`/machines/${l.id}`}
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all block">
                        <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{l.categoryName}</span>
                        <h3 className="font-bold text-gray-900 text-sm mt-2 mb-1">{l.title}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{l.description}</p>
                        <p className="text-xs text-gray-400">📍 {l.vendorCity}</p>
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

              {/* Buying Guide */}
              {seoData?.buyGuide && (
                <section className="bg-blue-50 rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">Buyer&apos;s Checklist — {cat.name}</h2>
                  <ul className="space-y-2">
                    {seoData.buyGuide.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 font-bold mt-0.5">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Range */}
              {seoData && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">{cat.name} Price Range in India</h3>
                  <p className="text-2xl font-bold text-blue-800 mb-3">{seoData.priceRange}</p>
                  <div className="space-y-2">
                    {seoData.priceTable.map((row) => (
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

              {/* Top Cities */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Top Cities for {cat.name}</h3>
                <div className="space-y-1.5">
                  {topCities.map((city) => {
                    const cityObj = SEO_CITIES.find((c) => c.name === city);
                    return cityObj ? (
                      <Link
                        key={city}
                        href={`/suppliers/${cityObj.slug}/${category}`}
                        className="flex items-center justify-between text-xs text-gray-600 hover:text-blue-700 py-1 border-b border-gray-50"
                      >
                        <span>📍 {city}, {cityObj.state}</span>
                        <span className="text-blue-600">→</span>
                      </Link>
                    ) : (
                      <p key={city} className="text-xs text-gray-500">📍 {city}</p>
                    );
                  })}
                </div>
              </div>

              {/* Use Cases */}
              {seoData?.useCases && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Industries That Use {cat.name}</h3>
                  <ul className="space-y-1.5">
                    {seoData.useCases.map((u) => (
                      <li key={u} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-orange-500 mt-0.5">▸</span>{u}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
                <p className="font-bold text-gray-900 text-sm mb-1">Need a {cat.name}?</p>
                <p className="text-gray-500 text-xs mb-3">Post your RFQ and get quotes from {cat.count}+ verified manufacturers.</p>
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
