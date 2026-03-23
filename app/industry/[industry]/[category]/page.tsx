import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_VENDORS, SEED_LISTINGS } from "@/app/lib/data";
import { SEO_INDUSTRIES, CATEGORY_SEO, getIndustryBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ industry: string; category: string }>;
}

export async function generateStaticParams() {
  return SEO_INDUSTRIES.flatMap((ind) =>
    ind.machineCategories.map((cat) => ({ industry: ind.slug, category: cat }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry, category } = await params;
  const ind = getIndustryBySlug(industry);
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!ind || !cat) return {};

  return {
    title: `${cat.name} for ${ind.name} Industry — Verified Manufacturers India | A TO Z Machines`,
    description: `Find verified ${cat.name} manufacturers for the ${ind.name} sector in India. Industry-compliant machines, GST-verified vendors. Get free quotes within 24 hours.`,
    keywords: `${cat.name} ${ind.name.toLowerCase()} industry, ${cat.name.toLowerCase()} ${ind.name.toLowerCase()} manufacturers India, industrial ${cat.name.toLowerCase()} ${ind.name.toLowerCase()}`,
    alternates: { canonical: `https://atozmachines.store/industry/${industry}/${category}` },
  };
}

export default async function IndustryCategoryPage({ params }: Props) {
  const { industry, category } = await params;
  const ind = getIndustryBySlug(industry);
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!ind || !cat) notFound();

  const seoData = CATEGORY_SEO[category];

  const vendors = SEED_VENDORS.filter((v) => v.isApproved && v.categories.includes(category));
  const allVendors = vendors.length > 0 ? vendors : SEED_VENDORS.filter((v) => v.isApproved);
  const listings = SEED_LISTINGS.filter((l) => l.categorySlug === category && l.isApproved);
  const relatedIndustryCats = CATEGORIES.filter((c) => ind.machineCategories.includes(c.slug) && c.slug !== category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat.name} for ${ind.name} Industry`,
    description: `Verified ${cat.name} manufacturers for the ${ind.name} sector in India`,
    url: `https://atozmachines.store/industry/${industry}/${category}`,
    numberOfItems: allVendors.length,
    itemListElement: allVendors.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "LocalBusiness", name: v.companyName, address: { "@type": "PostalAddress", addressLocality: v.city, addressRegion: v.state, addressCountry: "IN" } },
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
            <nav className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <Link href="/" className="hover:text-blue-700">Home</Link>
              <span>/</span>
              <Link href={`/industry/${industry}`} className="hover:text-blue-700">{ind.name} Industry</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{cat.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-3">{ind.icon} {ind.name} Industry · {cat.name}</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                {cat.name} for {ind.name} Industry
              </h1>
              <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                Sourcing {cat.name} for your {ind.name} plant? A TO Z Machines connects you with {allVendors.length}+ verified Indian manufacturers
                who supply industry-compliant {cat.name} to leading {ind.name} companies across India.
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">{allVendors.length}+</span>
                  <span className="text-blue-200 ml-1">Verified Vendors</span>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">24hr</span>
                  <span className="text-blue-200 ml-1">Quote Response</span>
                </div>
                {seoData && (
                  <div className="bg-white/10 rounded-lg px-4 py-2">
                    <span className="font-bold text-white">{seoData.priceRange}</span>
                    <span className="text-blue-200 ml-1">Price Range</span>
                  </div>
                )}
              </div>
              <Link href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm">
                Get {ind.name}-Grade {cat.name} Quotes
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main */}
            <div className="lg:col-span-2 space-y-8">

              {/* Industry Requirements */}
              <section className="bg-blue-50 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 mb-3">{ind.name} Industry Requirements for {cat.name}</h2>
                <ul className="space-y-2">
                  {ind.challenges.slice(0, 3).map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 font-bold mt-0.5">→</span>{c}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Vendors */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Verified {cat.name} Manufacturers — {ind.name} Sector
                </h2>
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

              {/* Listings */}
              {listings.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{cat.name} — Active Listings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {listings.map((l) => (
                      <Link key={l.id} href={`/machines/${l.id}`}
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all block">
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{l.title}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{l.description}</p>
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

              {/* Buy Guide */}
              {seoData?.buyGuide && (
                <section className="bg-gray-50 rounded-2xl p-6">
                  <h2 className="text-base font-bold text-gray-900 mb-3">Buying {cat.name} for {ind.name} — Checklist</h2>
                  <ul className="space-y-2">
                    {seoData.buyGuide.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 font-bold mt-0.5">✓</span>{tip}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Price */}
              {seoData && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{cat.name} Price Range</h3>
                  <p className="text-2xl font-bold text-blue-800 mb-3">{seoData.priceRange}</p>
                  <div className="space-y-2">
                    {seoData.priceTable.slice(0, 4).map((row) => (
                      <div key={row.spec} className="flex justify-between text-xs border-b border-gray-100 pb-1.5">
                        <span className="text-gray-600">{row.spec}</span>
                        <span className="font-semibold text-gray-900">{row.priceRange}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related industry machines */}
              {relatedIndustryCats.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Other {ind.name} Machinery</h3>
                  <div className="space-y-1.5">
                    {relatedIndustryCats.map((c) => (
                      <Link key={c.slug} href={`/industry/${industry}/${c.slug}`}
                        className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-700 py-1 border-b border-gray-50">
                        <span>{c.icon}</span><span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
                <p className="font-bold text-gray-900 text-sm mb-1">Need {ind.name}-grade {cat.name}?</p>
                <p className="text-gray-500 text-xs mb-3">Post your spec and get quotes from verified manufacturers within 24 hours.</p>
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
